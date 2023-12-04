import store, { useStoreForComponent } from '../../../classes/Store';
import { propType } from '../../../utils/types/propType';
import Link from '../link';

const mapper = (state: propType) => ({
  href: '#',
  text: state.bundle?.buttons?.changeAvatar,
  events: {
    click: (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log(event);
    },
  },
});

const avatarLink = useStoreForComponent(mapper, mapper(store.getState()), Link);

export default avatarLink;
