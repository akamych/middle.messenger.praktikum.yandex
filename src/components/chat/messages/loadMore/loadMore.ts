import Block from '../../../../classes/Block.ts';
// eslint-disable-next-line import/no-unresolved
import template from './loadMore.hbs?raw';
import { useStore } from '../../../../classes/Store.ts';
import ChatService from '../../../../services/ChatService.ts';

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
