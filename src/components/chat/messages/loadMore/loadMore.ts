import Block from '../../../../classes/Block.js';
// eslint-disable-next-line import/no-unresolved
import template from './loadMore.hbs?raw';
import { useStore } from '../../../../classes/Store.js';
import ChatService from '../../../../services/ChatService.js';

class LoadMoreMessages extends Block {
  constructor() {
    super({
      template,
      events: {
        click: () => ChatService.loadMoreMessages(),
      },
    });
  }

  protected static _template: string = template;
}

const useStoreImpl = useStore((state) => ({
  text: state.bundle?.buttons.moreMessages,
}));

export default useStoreImpl(LoadMoreMessages);
