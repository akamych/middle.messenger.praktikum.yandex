import store, { useStoreForComponent } from '../../../classes/Store.ts';
import { PropType } from '../../../utils/types/propType.ts';
import InputFile from '../../inputs/files/files.ts';
import usersService from '../../../services/UsersService.ts';

const mapper = (state: PropType) => ({
  fileButton: state.bundle?.buttons?.changeAvatar,
  name: 'avatar',
  allow: {
    pictures: true,
  },
  events: {
    change: (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (!input || !input.files) { return; }

      const formData = new FormData();
      formData.append('avatar', input.files[0]);
      usersService.updateAvatar(formData);
    },
  },
});

const avatarLink = useStoreForComponent(mapper, mapper(store.getState()), InputFile);

export default avatarLink;
