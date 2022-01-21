import { IChatPanelProps } from '../../types/Types';
import Block from '../../utils/block';
import templateCompiled from './chatPanel.handlebars';

const togglerPrefix = 'toggler_';

export enum ChatPanelEvents {
  // eslint-disable-next-line no-unused-vars
  click = 'CLICK'
}

export default class ChatPanel extends Block<IChatPanelProps> {
  static counter = 0;

  static maxMsgLength = 30;

  constructor(root: HTMLElement, props: IChatPanelProps) {
    if (props.lastMsg && props.lastMsg.length > ChatPanel.maxMsgLength) {
      props.lastMsg = `${props.lastMsg.slice(0, ChatPanel.maxMsgLength)}...`;
    }
    super(props, root);
  }

  render() {
    const root = this.getElement();
    if (!root) {
      return;
    }
    const currentChatId = this.props.id;
    const currentTogglerId = `${togglerPrefix}${this.props.id}`;
    const templateData = {
      ...this.props,
      togglerId: currentTogglerId,
      chatId: currentChatId,
    };
    const newDiv = document.createElement('div');
    newDiv.innerHTML = templateCompiled(templateData).trim();
    // eslint-disable-next-line no-undef
    const node = (newDiv.firstChild as ChildNode);
    root.appendChild(node);
    node.addEventListener('click', () => {
      this.eventBus().emit(ChatPanelEvents.click);
    });
  }

  stateToProps: () => IChatPanelProps;

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
      if (showMoreBtn) {
        showMoreBtn.addEventListener('click', (event) => {
          event.stopPropagation();
        });
      }
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected componentDidMount() { }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public fetchData() { }
}
