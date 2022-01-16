import EventBus from '../utils/eventBus';

export default class WebSocketTransport {
  static API_URL = '//ya-praktikum.tech/';

  protected socket: WebSocket;

  private _isConnected: boolean;

  userId: number;

  chatId: number;

  token: string;

  private _eventBus: EventBus;

  constructor(userId: number, chatId: number, token: string) {
    this.socket = new WebSocket(this.buildUrl(userId, chatId, token));
    this._eventBus = new EventBus();

    setInterval(() => {
      const currentSocket = this.getCurrentSocket();
      if (currentSocket && currentSocket.readyState !== WebSocket.CLOSED && currentSocket.readyState !== WebSocket.CLOSING) {
        this.getCurrentSocket().send(JSON.stringify({ content: '', type: 'ping' }));
      }
    }, 50000);

    this.socket.addEventListener('close', () => {
      this._isConnected = false;
    });

    this.socket.addEventListener('message', (event) => {
      const message: WebSocketMessage | WebSocketMessage[] = JSON.parse(event.data) as WebSocketMessage | WebSocketMessage[];
      if (Array.isArray(message) || message.type === 'message') {
        this.eventBus().emit(WebSocketTransportEvents.messageRecieved, message);
      }
    });

    this.socket.addEventListener('open', () => {
      this._isConnected = true;
      this.socket.send(JSON.stringify({
        content: 0,
        type: 'get old',
      }));
    });

    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', event);
    });
  }



  private getCurrentSocket() {
    return this.socket;
  }

  private buildUrl(userId: number, chatId: number, token: string) {
    return `wss://${WebSocketTransport.API_URL}ws/chats/${userId}/${chatId}/${token}`;
  }

  eventBus() {
    return this._eventBus;
  }

  disconnect() {
    this.socket.close();
  }

  IsConnected() {
    return this._isConnected;
  }

  sendMessage(message: string) {
    this.socket.send(JSON.stringify({ content: message, type: 'message' }));
  }
}

export interface WebSocketMessage {
    content: string;
    type: string;
    chat_id: number;
    time: string;
    user_id: number;
    id: number;
}

export enum WebSocketTransportEvents {
    messageRecieved = 'NEW_MESSAGE'
}
