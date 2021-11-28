import Block from "../../utils/block";
import { IMessage, IMessagesProps, Messages, MessageType } from "../../components/Messages/messages";
import ChatPanel, { IChatPanelProps } from "../../components/ChatPanel/chatPanel";
import { IUserPanelProps, UserPanel } from "../../components/UserPanel/userPanel";
import { templateCompiled } from "./Chats.hbs";
import { NewMessage } from "../../components/NewMessage/newMessage";
import { AccountEvents, contextMenuProps } from "../../types/Types";
import { FormEvents } from "../../utils/constants";
import EditProfilePage from "../editProfile/EditProfile";

export interface IChatsProps {
    messages: IMessagesProps;
    chats: IChatPanelProps[];
    user: IUserPanelProps;
    activeChat: IUserPanelProps;
    options: contextMenuProps
}

export enum ChatWindowEvents {
    userSettingsClick = "USER_SETTINGS"
}

export class ChatsPage extends Block<IChatsProps> {
    constructor(root: HTMLElement, props: IChatsProps) {
        super(props, root);
    }

    render() {
        console.debug('render chat window');
        this.element.innerHTML = templateCompiled(this.props.options); //TODO Если нет активного чата -> рисовать заглушку
        let messagesRoot = document.getElementById("messages-root");
        let userInfoRoot = document.getElementById("user-info-root");
        let chatsListRoot = document.getElementById("chats-list-root");
        let userBlock = new UserPanel(userInfoRoot, this.props.user);
        userBlock.eventBus().on(ChatWindowEvents.userSettingsClick, () => this.eventBus().emit(ChatWindowEvents.userSettingsClick));
        if (this.props.activeChat) {
            let activeBlock = new UserPanel(userInfoRoot, this.props.activeChat);
        }
        for (let chat of this.props.chats) {
            let newChat = new ChatPanel(chatsListRoot, chat);
        }
        ChatPanel.addEvents();
        let messages = new Messages(messagesRoot, this.props.messages);
        let newMessageField = new NewMessage(messagesRoot);

        let userSettings = new EditProfilePage(this.element);
        userSettings.hide();
    
        userSettings.eventBus().on(FormEvents.Cancel, ()=>userSettings.hide());
        userSettings.eventBus().on(AccountEvents.Logout, ()=>this.eventBus().emit(AccountEvents.Logout));

        this.eventBus().on(ChatWindowEvents.userSettingsClick, ()=>{
            userSettings.show();
        })

        newMessageField.eventBus().on(FormEvents.Submit, (value)=>{
            console.log("POST backend/chats/messages ", value);
            let newMessage:IMessage = {
                content: value as unknown as string,
                createdAt: new Date(),
                type:MessageType.Outgoing};
            let newProps:IChatsProps = {
                ...this.props,
                messages: {messages: [...this.props.messages.messages, newMessage]}
            };
            this.setProps(newProps);
        })

        this._addEvents();
    }
    private _addEvents() {
        let togglers = this.element.getElementsByClassName("chat-options-toggler");
        let contextMenu = this.element.querySelector("#context-popup") as HTMLDivElement;
        let isPopupShown = false;
        this.element.addEventListener("click", (event) => {
            if (isPopupShown) {
                isPopupShown = false;
                return;
            }
            contextMenu.setAttribute("hidden", "hidden");
            event.stopPropagation();
        })
        for (let toggle of togglers) {
            toggle.addEventListener("click", (event) => {
                contextMenu.removeAttribute("hidden");
                contextMenu.dataset.selectedChat = toggle.getAttribute("id").slice(8);
                contextMenu.style.top = `${(event as MouseEvent).clientY + 5}px`;
                contextMenu.style.left = `${(event as MouseEvent).clientX}px`;
                isPopupShown = true;
            });
        }
        contextMenu.addEventListener("click",(event)=>{
            let targetElem = (event.target as HTMLElement);
            let selectedChat = contextMenu.dataset.selectedChat;
            if(targetElem.tagName==="SPAN"){
                switch(targetElem.id){
                    case("disableNotifications"):
                        console.log("PATCH backend/chats/disable", selectedChat)
                    break;
                    case("deleteChat"):
                        console.log("DELETE backend/chats/delete", selectedChat)
                    break;
                    case("pinChat"):
                        console.log("PATCH backend/chats/pin", selectedChat)
                    break;
                }
            }
        });
    }


}