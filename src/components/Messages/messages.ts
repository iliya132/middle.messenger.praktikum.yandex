import { IMessage, IMessagesProps } from '../../types/Types';
import Block from '../../utils/block';
import { RootState } from '../../utils/store';
import templateCompiled from './messages.handlebars';

export class Messages extends Block<IMessagesProps> {

  constructor(root: HTMLElement, props: IMessagesProps) {
    super(props, root);
  }

  render() {
    const newDiv = document.createElement('div');
    const state: IMessagesProps = {
      error: this.props.error,
      messages: this.sortMessages(this.props.messages) ?? [],
    };

    newDiv.innerHTML = templateCompiled(state).trim();
    this.getElement()?.appendChild(newDiv.firstChild as ChildNode);
  }

  stateToProps: (state: RootState) => IMessagesProps = (state) => ({ ...this.props, ...state.chats.messages });

  private sortMessages(messages: IMessage[]) {
    if (!messages || messages.length === 0) {
      return null;
    }
    try {
      return messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    } catch (exception) {
      return null;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected componentDidMount(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public fetchData(): void {}
}
