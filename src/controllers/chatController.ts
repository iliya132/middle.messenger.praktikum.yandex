import ChatApi from '../api/chatApi';
import WebSocketTransport, { WebSocketMessage, WebSocketTransportEvents } from '../api/webSocket';
import { store } from '../store';
import { IChat, IMessage, MessageType } from '../types/Types';
import BasicController from './basicController';

export interface IChatsState{
  chats: IChat[],
  error: string,
  activeChat: number,
  messages: IMessage[]
}

class ChatController extends BasicController {
  private api: ChatApi;

  private socket: WebSocketTransport;

  private isSocketOpen: () => boolean;

  private controllerStatePath = 'chats';

  constructor(changeStateAction: (pathname: string, value: unknown) => void) {
    super(changeStateAction);
    this.api = new ChatApi();
    this.isSocketOpen = () => {
      if (!this.socket) {
        return false;
      }
      return this.socket.IsConnected();
    };
  }

  async getAll() {
    return await this.api.read();
  }

  async featchChats() {
    const chats = await this.getAll().catch(() => []);
    const model: IChatsState = {
      chats,
      error: '',
      activeChat: 0,
       messages: []
    };
    this.changeState(this.controllerStatePath, model);
  }

  async createChat(title: string) {
    try {
      await this.api.create(title);
      return true;
    } catch (exception) {
      return false;
    }
  }

  selectChat(id: number) {
    if (this.isSocketOpen()) {
      this.socket.disconnect();
    }
    this.getToken(id).then((response) => {
      this.connectToChat(id, response.token as string);
      this.changeState(this.controllerStatePath, { ...store.getState().chats, activeChat: id, messages: [] });
    });
  }

  async deleteChat(id: number) {
    return this.api.delete(id).then(() => {
      this.featchChats();
    })
      .catch((response) => {
        console.error('Error occurred while trying to delete chat: ', response.reason);
      });
  }

  async addUsers(userIds: number[], chatId: number) {
    return this.api.appendUsers(userIds, chatId);
  }

  async removeUsers(userIds: number[], chatId: number) {
    return this.api.removeUsers(userIds, chatId);
  }

  getToken(chatId: number) {
    return this.api.getToken(chatId);
  }

  openConnection() {
    const activeChatId: number = store.getState().chats.activeChat;
    return this.getToken(activeChatId).then((response) => {
      const { token } = response;
      this.connectToChat(activeChatId, token);
    });
  }

  connectToChat(chatId: number, token: string) {
    const currentUserId: number = store.getState().auth.user?.id ?? 0;
    this.socket = new WebSocketTransport(currentUserId, chatId, token);
    this.socket.eventBus().on(WebSocketTransportEvents.messageRecieved, ((response) => {
      const msg = response as WebSocketMessage | WebSocketMessage[];
      let newMessages: IMessage[];
      if (Array.isArray(msg)) {
        newMessages = msg.filter((i) => i.chat_id === chatId).map((i) => ({
          content: i.content,
          createdAt: new Date(i.time),
          type: i.user_id === currentUserId ? MessageType.Outgoing : MessageType.Incoming,
        }));
      } else {
        const chatMsg: IMessage = {
          content: msg.content,
          createdAt: new Date(msg.time),
          type: msg.user_id === currentUserId ? MessageType.Outgoing : MessageType.Incoming,
        };
        newMessages = [chatMsg];
      }
      let currentMessages = store.getState().chats.messages;
      currentMessages = currentMessages ?? [];
      this.changeState(this.controllerStatePath, {
        ...store.getState().chats,
        messages: [...currentMessages, ...newMessages],
      });
    }));
  }

  sendMessage(message: string) {
    if (!message) {
      return;
    }
    if (!this.isSocketOpen()) {
      this.openConnection().then(() => {
        this._sendMessage(message as string);
      });
    } else {
      this._sendMessage(message as string);
    }
  }

  private _sendMessage(message: string) {
    this.socket.sendMessage(message);
  }
}

const chatController = new ChatController((pathname, value) => store.setState(pathname, value));
export default chatController;
