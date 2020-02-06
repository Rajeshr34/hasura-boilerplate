import PublicIndexRouter from "./public";
import RouterHelper from "../helpers/router.helper";

//Every folder and its subfolder has its own index file like this
//which calls,create new instance of class's in its folder
export default class MainIndexRouter extends RouterHelper {

    autoLoad() {
    }

    router() {
        new PublicIndexRouter(this.app);
    }
}