import Block from '../../utils/block';
import { templateCompiled } from './chatPanel.hbs';

const togglerPrefix = 'toggler_';
const chatPrefix = 'chat_';

export interface IChatPanelProps {
    chatTitle: string;
    avatarSrc: string;
    lastMsg: string;
}

export default class ChatPanel extends Block<IChatPanelProps> {
  static counter :number = 0;

  static maxMsgLength = 30;

  constructor(root:HTMLElement, props: IChatPanelProps) {
    if (props.lastMsg.length > ChatPanel.maxMsgLength) {
      props.lastMsg = `${props.lastMsg.slice(0, ChatPanel.maxMsgLength)}...`;
    }
    super(props, root);
  }

  render() {
    const currentChatId = `${chatPrefix}${ChatPanel.counter}`;
    const currentTogglerId = `${togglerPrefix}${ChatPanel.counter++}`;
    const templateData = {
      ...this.props,
      togglerId: currentTogglerId,
      chatId: currentChatId,
    };
    const newDiv = document.createElement('div');
    newDiv.innerHTML = templateCompiled(templateData).trim();
    this.element.appendChild(newDiv.firstChild as ChildNode);
  }

  static addEvents() {
    const chatsList = document.getElementsByClassName('chats-list')[0];
    const chatInfos = chatsList.querySelectorAll('.chat-info');
    chatInfos.forEach((chatInfo) => {
      const currentId = chatInfo.id.slice(chatInfo.id.indexOf('_') + 1);
      const showMoreBtn = chatInfo.querySelector(`#${togglerPrefix}${currentId}`);
      chatInfo.addEventListener('mouseover', () => {
        showMoreBtn?.classList.remove('hidden');
      });
      chatInfo.addEventListener('mouseout', () => {
        showMoreBtn?.classList.add('hidden', 'hidden');
      });
    });
  }
}
