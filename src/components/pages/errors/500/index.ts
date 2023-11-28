import textBundle from '../../../../utils/bundle/text.json';
import ErrorPage from '../index.ts';

const error500Page = new ErrorPage({
  header: textBundle.errors[500].header,
  desc: textBundle.errors[500].desc,
});

export default error500Page;
