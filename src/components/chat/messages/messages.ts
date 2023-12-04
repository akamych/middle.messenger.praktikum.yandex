import Block from '../../../classes/Block.js';
import { useStore } from '../../../classes/Store.js';
import { propType } from '../../../utils/types/propType.js';
import ChatMessage from './message/message.js';
import { getMessageDate, getMessageTime } from '../../../utils/functions/dateTime.js';
// eslint-disable-next-line import/no-unresolved
import template from './messages.hbs?raw';

class ChatMessages extends Block {
  constructor() {
    super({ template });
  }

  protected static _template: string = template;
}

const prepareProp = (message: propType, state: propType) : propType | null => {
  if (message.user_id && message.content) {
    return ({
      id: message.id,
      content: message.content,
      unread: !message.is_read,
      byMe: message.user_id === state.user?.id,
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
  };

  const { messages } = state;
  if (!messages) { return {}; }

  for (let i = 0; i < messages.length; i += 1) {
    const props = prepareProp(messages[i], state);
    if (props === null) { continue; }
    model.messages.push(new ChatMessage(props));
  }
  return model;
});

export default useStoreImpl(ChatMessages);
