import { ChatsPage, IChatsProps } from "../pages/chatsPage/Chats";
import {catSrc, catsSrc, contextProps, showMoreSrc} from './constants';
import {MessageType} from "../components/Messages/messages";
import { IInputGroupParams } from "../types/Types";

export const chatPageTestProps: IChatsProps = {
    activeChat: {
        avatarSrc: catSrc,
        showMore: false,
        showMoreSrc: showMoreSrc,
        userName: "Test user name"
    },
    chats:[
        {
            avatarSrc: catSrc,
            chatTitle: "Chat1",
            lastMsg: "Some small message1"
        },
        {
            avatarSrc: catSrc,
            chatTitle: "Chat2",
            lastMsg: "Some larger message. Cause of lorem ipsum sdfgsdfg sdfgsdfg"
        }
    ],
    messages: {
        messages: [
            {
                content: "Some incoming message",
                createdAt: new Date(),
                type: MessageType.Incoming
            },
            {
                content: "Some outgoing message",
                createdAt: new Date(),
                type: MessageType.Outgoing
            },
            {
                content: "Today",
                createdAt: new Date(),
                type: MessageType.Devidor
            },
            {
                content: "Some incoming message",
                createdAt: new Date(),
                type: MessageType.Incoming
            },
            {
                content: "Some outgoing message",
                createdAt: new Date(),
                type: MessageType.Outgoing
            }
        ]
    },
    user: {
        avatarSrc: catSrc,
        showMore: true,
        showMoreSrc: showMoreSrc,
        userName: "Ilya Lebedev"
    },
    options: contextProps
}