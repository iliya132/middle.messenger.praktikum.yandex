import { IChatsProps } from '../pages/chatsPage/Chats';
import { catSrc, contextProps, showMoreSrc } from './constants';
import { MessageType } from '../components/Messages/messages';

export const chatPageTestProps: IChatsProps = {
  activeChat: {
    avatarSrc: catSrc,
    showMore: false,
    showMoreSrc,
    userName: 'Test user name',
  },
  chats: [
    {
      avatarSrc: catSrc,
      chatTitle: 'Chat1',
      lastMsg: 'Some small message1',
    },
    {
      avatarSrc: catSrc,
      chatTitle: 'Chat2',
      lastMsg: 'Some larger message. Cause of lorem ipsum sdfgsdfg sdfgsdfg',
    },
  ],
  messages: {
    messages: [
      {
        content: 'Some incoming message',
        createdAt: new Date(),
        type: MessageType.Incoming,
      },
      {
        content: 'Some outgoing message',
        createdAt: new Date(),
        type: MessageType.Outgoing,
      },
      {
        content: 'Today',
        createdAt: new Date(),
        type: MessageType.Dividor,
      },
      {
        content: 'Some incoming message',
        createdAt: new Date(),
        type: MessageType.Incoming,
      },
      {
        content: 'Some outgoing message',
        createdAt: new Date(),
        type: MessageType.Outgoing,
      },
    ],
  },
  user: {
    avatarSrc: catSrc,
    showMore: true,
    showMoreSrc,
    userName: 'Ilya Lebedev',
  },
  options: contextProps,
};
