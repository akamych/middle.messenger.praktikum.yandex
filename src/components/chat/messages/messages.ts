import Block from '../../../classes/Block.js';
import { useStore } from '../../../classes/Store.js';
import { propType } from '../../../utils/types/propType.js';
import ChatMessage from './message/message.js';
// eslint-disable-next-line import/no-unresolved
import template from './messages.hbs?raw';

class ChatMessages extends Block {
  constructor() {
    super({ template });
  }

  protected static _template: string = template;
}

const prepareProp = (message: propType) {
  
}

const useStoreImpl = useStore((state) => {
  const model: propType = {
    messages: [],
  };

  const { messages } = state;
  if (!messages) { return {}; }

  for (let i = 0; i < messages.length; i += 1) {
    console.log(messages[i]);
    model.messages.push(new ChatMessage({
      ...messages[i],
      byMe: messages[i].created_by === state.user?.id,
    }));
  }
  return model;
});

export default useStoreImpl(ChatMessages);
