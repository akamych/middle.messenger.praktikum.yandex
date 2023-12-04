import { FeedChatProps } from '../../components/chat/feed/chats/chats.ts';

export default function sortChats(chats: FeedChatProps[]) {
  return chats.sort((a: FeedChatProps, b: FeedChatProps) : number => {
    if (a.last_message === null && b.last_message === null) {
      return Number(b.id) - Number(a.id);
    }

    if (a.last_message !== null && b.last_message === null) {
      return -1;
    }

    if (a.last_message === null && b.last_message !== null) {
      return 1;
    }

    return new Date(a.last_message!.time) <= new Date(b.last_message!.time) ? 1 : -1;
  });
}
