import Block from '../../../classes/Block.ts';
import store, { useStore, useStoreForComponent } from '../../../classes/Store.ts';
import { PropType } from '../../../utils/types/propType.ts';
import Input from '../../inputs/input/input.ts';
import Form from '../../inputs/form/form.ts';
// eslint-disable-next-line import/no-unresolved
import template from './send.hbs?raw';
import Button from '../../inputs/button/button.ts';
// eslint-disable-next-line import/no-unresolved
import attachIcon from '../../../assets/svg/attach.svg?raw';
import chatService from '../../../services/ChatService.ts';

const inputStoreMapper = (state: PropType) => ({
  type: 'text',
  name: 'message',
  placeholder: state.bundle?.labels.messageText,
});

const input = useStoreForComponent(inputStoreMapper, inputStoreMapper(store.getState()), Input);

const buttonStoreMapper = (state: PropType) => ({
  type: 'submit',
  name: 'sendMessage',
  text: state.bundle?.buttons.sendMessage,
});

const button = useStoreForComponent(buttonStoreMapper, buttonStoreMapper(store.getState()), Button);

const form = new Form({
  inputs: [input],
  buttons: [button],
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      const form = event.target as HTMLFormElement;

      const input: HTMLInputElement | null = form.querySelector('input[name="message"]');
      if (!input) {
        return;
      }

      const { value: message } = input;
      chatService.sendMessage(message);
      input.value = '';
    },
  },
});

class ChatSend extends Block {
  constructor() {
    super({
      template,
      form,
      attachIcon,
    });
  }

  protected static _template: string = template;
}

const useStoreImpl = useStore((state) => ({
  activeChat: state.activeChat,
}));

export default useStoreImpl(ChatSend);
