import Block from "../../utils/block";
import { templateCompiled } from './chatPanel.hbs';

const togglerPrefix = "toggler_";
const chatPrefix = "chat_";

export interface IChatPanelProps {
    chatTitle: string;
    avatarSrc: string;
    lastMsg: string;
}

export default class ChatPanel extends Block<IChatPanelProps> {
    static counter :number = 0;
    static maxMsgLength = 30;
    constructor(root:HTMLElement, props: IChatPanelProps) {
        if(props.lastMsg.length > ChatPanel.maxMsgLength){
            props.lastMsg = props.lastMsg.slice(0,ChatPanel.maxMsgLength) + "...";
        }
        super(props, root);
    }

    render() {
        let currentChatId = `${chatPrefix}${ChatPanel.counter}`;
        let currentTogglerId = `${togglerPrefix}${ChatPanel.counter++}`;
        let templateData = {
            ...this.props,
            togglerId: currentTogglerId,
            chatId: currentChatId
        }
        let newDiv = document.createElement("div");
        newDiv.innerHTML = templateCompiled(templateData).trim();
        this.element.appendChild(newDiv.firstChild);
    }

    static addEvents(){
        let chatsList = document.getElementsByClassName('chats-list')[0];
        let chatInfos = chatsList.querySelectorAll('.chat-info');
        for(let chatInfo of chatInfos){
            let currentId = chatInfo.id.slice(5);
            let showMoreBtn = chatInfo.querySelector(`#${togglerPrefix}${currentId}`);
            chatInfo.addEventListener('mouseover', ()=>{
                showMoreBtn.removeAttribute('hidden');
            })
            chatInfo.addEventListener('mouseout', ()=>{
                showMoreBtn.setAttribute('hidden', 'hidden');
            })
        }
    }
}