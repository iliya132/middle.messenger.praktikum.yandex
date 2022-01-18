import { templateCompiled } from './newMessage.hbs';
import Block from '../../utils/block';
import { FormEvents } from '../../utils/constants';
import { IProps } from '../../types/Types';
import { RootState } from '../../utils/store';

export class NewMessage extends Block<IProps> {
  constructor(root: HTMLElement) {
    super({ error: '' }, root);
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

  stateToProps: (state: RootState) => IProps;

  private _addEvents() {
    const root = this.getElement();
    if (!root) {
      return;
    }
    const input = root.querySelector('#message') as HTMLInputElement;
    const sendBtn = root.querySelector('#send-new-message-btn') as HTMLButtonElement;
    sendBtn.addEventListener('click', () => {
      if (input.value) {
        this.eventBus().emit(FormEvents.Submit, input.value);
        input.value = '';
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected componentDidMount(): void { }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public fetchData(): void { }
}
