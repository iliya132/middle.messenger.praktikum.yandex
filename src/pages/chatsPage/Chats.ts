import Block from '../../utils/block';
import {
  IMessage, IMessagesProps, Messages, MessageType,
} from '../../components/Messages/messages';
import ChatPanel, { IChatPanelProps } from '../../components/ChatPanel/chatPanel';
import { IUserPanelProps, UserPanel } from '../../components/UserPanel/userPanel';
import { templateCompiled } from './Chats.hbs';
import { NewMessage } from '../../components/NewMessage/newMessage';
import { AccountEvents, contextMenuProps } from '../../types/Types';
import { FormEvents } from '../../utils/constants';
import EditProfilePage from '../editProfile/EditProfile';

export interface IChatsProps {
    messages: IMessagesProps;
    chats: IChatPanelProps[];
    user: IUserPanelProps;
    activeChat: IUserPanelProps;
    options: contextMenuProps
}

export enum ChatWindowEvents {
    userSettingsClick = 'USER_SETTINGS'
}

export class ChatsPage extends Block<IChatsProps> {
  constructor(root: HTMLElement, props: IChatsProps) {
    super(props, root);
  }

  render() {
    if(!this.element)
      return;
    this.element.innerHTML = templateCompiled(this.props.options); // TODO Если нет активного чата -> рисовать заглушку
    const messagesRoot = document.getElementById('messages-root') as HTMLElement;
    const userInfoRoot = document.getElementById('user-info-root') as HTMLElement;
    const chatsListRoot = document.getElementById('chats-list-root') as HTMLElement;
    const userBlock = new UserPanel(userInfoRoot, this.props.user);
    userBlock.eventBus().on(ChatWindowEvents.userSettingsClick, () => this.eventBus().emit(ChatWindowEvents.userSettingsClick));
    if (this.props.activeChat) {
      new UserPanel(userInfoRoot, this.props.activeChat);
    }
    for (const chat of this.props.chats) {
      new ChatPanel(chatsListRoot, chat);
    }
    ChatPanel.addEvents();
    new Messages(messagesRoot, this.props.messages);
    const newMessageField = new NewMessage(messagesRoot);

    const userSettings = new EditProfilePage(this.element);
    userSettings.hide();

    userSettings.eventBus().on(FormEvents.Cancel, () => userSettings.hide());
    userSettings.eventBus().on(AccountEvents.Logout, () => this.eventBus().emit(AccountEvents.Logout));

    this.eventBus().on(ChatWindowEvents.userSettingsClick, () => {
      userSettings.show();
    });

    newMessageField.eventBus().on(FormEvents.Submit, (value) => {
      console.log('POST backend/chats/messages ', value);
      const newMessage:IMessage = {
        content: value as unknown as string,
        createdAt: new Date(),
        type: MessageType.Outgoing,
      };
      const newProps:IChatsProps = {
        ...this.props,
        messages: { messages: [...this.props.messages.messages, newMessage] },
      };
      this.setProps(newProps);
    });

    this._addEvents();
  }

  private _addEvents() {
    const togglers = this.element?.querySelectorAll('.chat-options-toggler');
    const contextMenu = this.element?.querySelector('#context-popup') as HTMLDivElement;
    let isPopupShown = false;
    this.element?.addEventListener('click', (event) => {
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
          case ('disableNotifications'):
            console.log('PATCH backend/chats/disable', selectedChat);
            break;
          case ('deleteChat'):
            console.log('DELETE backend/chats/delete', selectedChat);
            break;
          case ('pinChat'):
            console.log('PATCH backend/chats/pin', selectedChat);
            break;
        }
      }
    });
  }
}
