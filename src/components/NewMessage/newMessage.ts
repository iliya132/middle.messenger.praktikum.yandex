import { templateCompiled } from './newMessage.hbs';
import Block, { BlockEvents } from '../../utils/block';
import { FormEvents } from '../../utils/constants';

export class NewMessage extends Block<object> {
  constructor(root: HTMLElement) {
    super({}, root);
    this.eventBus().on(BlockEvents.FLOW_RENDER, this._addEvents);
    this._addEvents();
  }

  render() {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = templateCompiled(this.props).trim();
    this.element.appendChild(newDiv.firstChild as ChildNode);
  }

  private _addEvents() {
    const input = this.element.querySelector('#message') as HTMLInputElement;
    const sendBtn = this.element.querySelector('#send-new-message-btn') as HTMLButtonElement;
    sendBtn.addEventListener('click', () => {
      if (input.value) {
        this.eventBus().emit(FormEvents.Submit, input.value);
        input.value = '';
      }
    });
  }
}
