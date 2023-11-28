import textBundle from '../../../../utils/bundle/text.json';
import ErrorPage from '../index.ts';

const error404Page = new ErrorPage({
  header: textBundle.errors[404].header,
  desc: textBundle.errors[404].desc,
});

export default error404Page;
