import store, { useStoreForComponent } from '../../../classes/Store.ts';
import AuthService from '../../../services/AuthService.ts';
import { propType } from '../../../utils/types/propType.ts';
import Link from '../link.ts';

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
