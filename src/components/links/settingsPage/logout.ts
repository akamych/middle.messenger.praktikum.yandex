import store, { useStoreForComponent } from '../../../classes/Store';
import AuthService from '../../../services/AuthService';
import { propType } from '../../../utils/types/propType';
import Link from '../link';

const mapper = (state: propType) => ({
  href: state.bundle?.pages?.logout.link,
  text: state.bundle?.pages?.logout.title,
  events: {
    click: (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      AuthService.logout();
    },
  },
});

const logoutLink = useStoreForComponent(mapper, mapper(store.getState()), Link);

export default logoutLink;
