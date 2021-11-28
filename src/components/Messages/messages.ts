import Block from '../../utils/block';
import {templateCompiled} from './messages.hbs';

export enum MessageType{
    Incoming = "message incoming",
    Outgoing = "message outgoing",
    Devidor = "devidor"
}

export interface IMessage {
    content: string;
    createdAt: Date;
    type: MessageType;
}

export interface IMessagesProps {
    messages: IMessage[];
}

export class Messages extends Block<IMessagesProps> {
    constructor(root: HTMLElement, props: IMessagesProps) {
        super(props, root);
    }

    render() {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = templateCompiled(this.props).trim();
        this.element.appendChild(newDiv.firstChild);
    }
}
