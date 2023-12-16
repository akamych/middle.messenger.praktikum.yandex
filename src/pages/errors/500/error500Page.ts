import { useStore } from "../../../classes/Store.ts";
import ErrorPage from "../errorPage.ts";

const useStoreImpl = useStore((state) => ({
  header: state.bundle?.errors[500].header,
  desc: state.bundle?.errors[500].desc,
}));

export default useStoreImpl(ErrorPage);
