import Block from '../../utils/block';
import ChatPanel, { ChatPanelEvents } from '../../components/ChatPanel/chatPanel';
import { ActiveChatPanel, defaultActiveChatPanelState, UserPanel } from '../../components/UserPanel/userPanel';
import templateCompiled from './Chats.handlebars';
import { NewMessage } from '../../components/NewMessage/newMessage';
import IUser, {
  AccountEvents, IChat, IMessage, IProps, IUserPanelProps,
} from '../../types/Types';
import { contextProps, FormEvents } from '../../utils/constants';
import { addNewChatSrc, defaultAvatarSrc, showMoreSrc } from '../../utils/images';
import EditProfilePage from '../editProfile/EditProfile';
import { Messages } from '../../components/Messages/messages';
import chatController from '../../controllers/chatController';
import authController from '../../controllers/authController';
import { store } from '../../store';
import Router from '../../utils/router';
import { RootState } from '../../utils/store';

export enum ChatWindowEvents {
  userSettingsClick = 'USER_SETTINGS'
}

export interface IChatsProps extends IProps {
  chats: IChat[];
  activeChat: number;
  user: IUser | null;
  messages: IMessage[];
}

export class ChatsPage extends Block<IChatsProps> {
  constructor(root: HTMLElement, props: IChatsProps) {
    super(props, root);
  }

  render() {
    const root = this.getElement();
    if (!root) return;
    root.innerHTML = templateCompiled(contextProps); // TODO Если нет активного чата -> рисовать заглушку
    const messagesRoot = document.getElementById('messages-root') as HTMLElement;
    const userInfoRoot = document.getElementById('user-info-root') as HTMLElement;
    const chatsListRoot = document.getElementById('chats-list-root') as HTMLElement;

    this.renderUserBlock(userInfoRoot);
    this.renderActiveChat(userInfoRoot);
    this.renderChats(chatsListRoot);
    this.renderMessages(messagesRoot);
    this.renderProfileSettings(root);

    this._addEvents();
  }

  private renderUserBlock(root: HTMLElement) {
    const userBlock = new UserPanel(root, {
      avatarSrc: this.props?.user?.avatar ? this.props.user.avatar : defaultAvatarSrc,
      error: '',
      showMore: true,
      showMoreSrc,
      userName: this.props.user?.displayName ? this.props.user.displayName : `${this.props.user?.secondName} ${this.props.user?.firstName}`,
    });
    userBlock.render();
    userBlock.eventBus().on(ChatWindowEvents.userSettingsClick, () => this.eventBus().emit(ChatWindowEvents.userSettingsClick));
  }

  private renderActiveChat(root: HTMLElement) {
    if (this.props.activeChat) {
      const activeChat = this.props.chats.filter((i) => i.id === this.props.activeChat)[0];
      if (activeChat) {
        const activeChatProps: IUserPanelProps = { ...defaultActiveChatPanelState, avatarSrc: activeChat.avatar ? activeChat.avatar : defaultAvatarSrc, userName: activeChat.title, showMoreSrc: '' }
        const activeChatUserPanel = new ActiveChatPanel(root, activeChatProps);
        activeChatUserPanel.render();
      }
    }
  }

  private renderChats(root: HTMLElement) {
    if (this.props.chats) {
      for (const chat of this.props.chats) {
        const chatPanel = new ChatPanel(root, {
          avatar: chat.avatar ? chat.avatar : defaultAvatarSrc, error: '', lastMsg: chat.last_message?.content, title: chat.title, id: chat.id,
        });
        chatPanel.render();
        chatPanel.eventBus().on(ChatPanelEvents.click, () => {
          chatController.selectChat(chat.id);
        });
      }
      ChatPanel.addEvents();
    }
    const addNewChat = new ChatPanel(root, {
      avatar: addNewChatSrc, error: '', lastMsg: 'start chat now', title: 'Create new', id: -1,
    });
    addNewChat.eventBus().on(ChatPanelEvents.click, () => {
      const title = prompt('Введите название нового чата');
      if (title) {
        chatController.createChat(title).then(() => chatController.featchChats());
      }
    });
    addNewChat.render();
  }

  private renderMessages(root: HTMLElement) {
    const messages = new Messages(root, { messages: this.props.messages, error: '' });
    messages.render();
    const newMessageField = new NewMessage(root);
    newMessageField.eventBus().on(FormEvents.Submit, (message) => {
      const newMsg: string = message as unknown as string;
      chatController.sendMessage(newMsg);
    });
    newMessageField.render();
  }

  private renderProfileSettings(root: HTMLElement) {
    const userSettings = new EditProfilePage(root, {
      displayName: this.props.user?.displayName ?? '',
      email: this.props.user?.email ?? '',
      error: '',
      firstName: this.props.user?.firstName ?? '',
      login: this.props.user?.login ?? '',
      newPassword: '',
      oldPassword: '',
      phone: this.props.user?.phone ?? '',
      secondName: this.props.user?.secondName ?? '',
      avatar: this.props.user?.avatar ?? '',
    });
    userSettings.render();
    userSettings.hide();

    userSettings.eventBus().on(FormEvents.Cancel, () => userSettings.hide());
    userSettings.eventBus().on(AccountEvents.Logout, () => {
      authController.logout().then(() => {
        Router.getInstance().go('/');
      });
    });

    this.eventBus().on(ChatWindowEvents.userSettingsClick, () => {
      // get user settings props
      userSettings.show();
    });
  }

  public override fetchData(): void {
    if (!store.getState()){
      return;
    }
    if (!store.getState().auth.isSignedIn) {
      authController.fetchUser();
    }
    chatController.featchChats();
  }

  stateToProps: (state: RootState) => IChatsProps = (state) => {
    console.log(state);
return {
    ...this.props, chats: state.chats?.chats, user: state.auth?.user, activeChat: state.chats?.activeChat, messages: state.chats?.messages,
}
  };

  private _addEvents() {
    const togglers = this.getElement()?.querySelectorAll('.chat-options-toggler');
    const contextMenu = this.getElement()?.querySelector('#context-popup') as HTMLDivElement;
    let isPopupShown = false;
    this.getElement()?.addEventListener('click', (event) => {
      if (isPopupShown) {
        isPopupShown = false;
        return;
      }
      contextMenu.classList.add('hidden');
      event.stopPropagation();
    });
    togglers?.forEach((toggle) => {
      toggle.addEventListener('click', (event) => {
        contextMenu.classList.remove('hidden');
        contextMenu.dataset.selectedChat = toggle.getAttribute('id')?.slice(8);
        contextMenu.style.top = `${(event as MouseEvent).clientY + 5}px`;
        contextMenu.style.left = `${(event as MouseEvent).clientX}px`;
        isPopupShown = true;
      });
    });
    contextMenu.addEventListener('click', (event) => {
      const targetElem = (event.target as HTMLElement);
      const { selectedChat } = contextMenu.dataset;
      if (targetElem.tagName === 'SPAN') {
        switch (targetElem.id) {
          case ('addUsers'):
            if (selectedChat){
              addUser(selectedChat);
            }
            break;
          case ('removeUsers'):
            if (selectedChat){
              removeUser(selectedChat);
            }
            break;
          case ('deleteChat'):
            chatController.deleteChat(Number(selectedChat));
            break;
        }
      }
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected componentDidMount(): void { }
}

function removeUser(chatId: string) {
  const usersToRemove = prompt("Please type userIds devided by ',':");
  if (!usersToRemove) {
    return;
  }
  try {
    const userIds = usersToRemove.split(',').map((i) => Number(i));
    chatController.removeUsers(userIds, Number(chatId)).then(() => {
      chatController.featchChats();
    }).catch((exception) => {
      console.error('Error occerred while trying to remove users from chat: ', exception.reason);
    });
  } catch (exception) {
    console.error('Error occerred while trying to remove users from chat: ', exception.reason);
  }
}

function addUser(chatId: string) {
  const userIdsInput = prompt("Please type userIds devided by ',':");
  if (!userIdsInput) {
    return;
  }
  try {
    const userIds = userIdsInput.split(',').map((i) => Number(i));
    chatController.addUsers(userIds, Number(chatId)).then(() => {
      chatController.featchChats();
    }).catch((exception) => {
      console.error('Error occerred while trying to add users to chat: ', exception.reason);
    });
  } catch (exception) {
    console.error('Error occerred while trying to add users to chat: ', exception.reason);
  }
}

export const defaultChatsState: IChatsProps = {
  chats: [],
  error: '',
  activeChat: 0,
  user: {
    id: 0, avatar: '', email: '', firstName: '', login: '', password: '', phone: '', secondName: '', displayName: '',
  },
  messages: [],
};
