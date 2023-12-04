import store, { useStoreForComponent } from '../../../classes/Store';
import { propType } from '../../../utils/types/propType';
import InputFile from '../../inputs/files/files';
import usersService from '../../../services/UsersService';

const mapper = (state: propType) => ({
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
