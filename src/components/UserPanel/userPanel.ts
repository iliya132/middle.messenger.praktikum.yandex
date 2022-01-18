import { ChatWindowEvents } from '../../pages/chatsPage/Chats';
import { IChat, IUserPanelProps } from '../../types/Types';
import Block, { BlockEvents } from '../../utils/block';
import { defaultAvatarSrc, showMoreSrc } from '../../utils/images';
import { RootState } from '../../utils/store';
import { templateCompiled } from './userPanel.hbs';

export class UserPanel extends Block<IUserPanelProps> {
  constructor(root:HTMLElement, props: IUserPanelProps) {
    super(props, root);
    this.eventBus().on(BlockEvents.FLOW_RENDER, () => this._addEvents());
  }

  render() {
    const root = this.getElement();
    if (!root) {
      return;
    }
    const newDiv = document.createElement('div');
    newDiv.innerHTML = templateCompiled(this.props).trim();
    root.appendChild(newDiv.firstChild as ChildNode);
    this._addEvents();
  }

  stateToProps: (state: RootState) => IUserPanelProps = (state) => ({
    avatarSrc: state.auth.user?.avatar ?? defaultAvatarSrc,
    error: state.auth.error,
    showMore: true,
    showMoreSrc,
    userName: `${state.auth.user?.secondName} ${state.auth.user?.firstName}`,
  });

  _addEvents() {
    const root = this.getElement();
    if (!root) {
      return;
    }
    const editProfileBtn = root.querySelector('#editProfile') as HTMLImageElement;
    if (editProfileBtn) {
      editProfileBtn.addEventListener('click', () => {
        this.eventBus().emit(ChatWindowEvents.userSettingsClick);
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected componentDidMount(): void { }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public fetchData(): void { }
}

export class ActiveChatPanel extends UserPanel {
  override stateToProps: (state: RootState) => IUserPanelProps = (state) => {
    const activeChatNumber = state.chats.activeChat as number;
    if (!activeChatNumber) {
      return {
        avatarSrc: defaultAvatarSrc,
        error: 'no chat selected',
        showMore: false,
        showMoreSrc,
        userName: '',
      };
    }
    const activeChat = state.chats.chats.filter((i) => i.id == activeChatNumber)[0] as IChat;
    return {
      avatarSrc: activeChat.avatar,
      error: '',
      showMore: false,
      showMoreSrc,
      userName: activeChat.title,
    };
  };
}

export const defaultActiveChatPanelState = {
  avatarSrc: defaultAvatarSrc, error: '', showMore: false, showMoreSrc: null, userName: '',
};
