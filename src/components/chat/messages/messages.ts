import Block from '../../../classes/Block.ts';
import { useStore } from '../../../classes/Store.ts';
import { propType } from '../../../utils/types/propType.ts';
import ChatMessage from './message/message.ts';
import { getMessageDate, getMessageTime } from '../../../utils/functions/dateTime.ts';
// eslint-disable-next-line import/no-unresolved
import template from './messages.hbs?raw';
import LoadMoreMessages from './loadMore/loadMore.ts';
import CONSTANTS from '../../../utils/bundle/constants.ts';

const loadMoreMessages = new LoadMoreMessages();
class ChatMessages extends Block {
  constructor() {
    super({ loadMoreMessages, template });
  }

  protected static _template: string = template;
}

const prepareProp = (message: propType, state: propType) : propType | null => {
  if (message.user_id && message.content) {
    let avatar: string | null = null;
    if (message.user_id === state.user?.id) {
      avatar = state.user.avatar;
    } else if (state.usersList?.users?.length > 0) {
      Object.entries(state.usersList.users).forEach(([, user]) => {
        const { id, userAvatar } = user as propType;
        if (id === message.user_id) {
          avatar = userAvatar;
        }
      });
    }
    return ({
      id: message.id,
      content: message.content,
      unread: !message.is_read,
      byMe: message.user_id === state.user?.id,
      avatar,
      date: getMessageDate(message.time),
      time: getMessageTime(message.time),
      user: message.user_id,
    });
  }

  return null;
};

const useStoreImpl = useStore((state) => {
  const model: propType = {
    messages: [],
    myAvatar: state.user?.avatar,
    noMoreMessages: state.noMoreMessages === true
      || !state.activeChat
      || state.messages?.length < CONSTANTS.MESSAGES_PER_REQUEST,
  };

  const { messages } = state;
  if (!messages) { return {}; }

  for (let i = 0; i < messages.length; i += 1) {
    const props = prepareProp(messages[i], state);
    // eslint-disable-next-line no-continue
    if (props === null) { continue; }
    model.messages.push(new ChatMessage(props));
  }
  return model;
});

export default useStoreImpl(ChatMessages);
