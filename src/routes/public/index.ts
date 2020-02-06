import RouterHelper from "../../helpers/router.helper";
import ExpressResponse from "../../interfaces/express.response";
import ExpressRequest from "../../interfaces/express.request";
import PublicConnectIndexRouter from "./connect";
import PublicAuthIndexRouter from "./auth";
import ErrorResponseHelper from "../../helpers/error.response.helper";
import RouterAuth from "../../helpers/router.auth";

//Every folder and its subfolder has its own index file like this
//which calls,create new instance of class's in its folder
export default class PublicIndexRouter extends RouterHelper {

    autoLoad() {
    }

    router() {
        this.setHome();
        new PublicConnectIndexRouter(this.app);
        new PublicAuthIndexRouter(this.app);
    }

    private setHome() {
        this.app.get(this.getRoutes().HOME, RouterAuth.isPublic, (req: ExpressRequest | any, res: ExpressResponse) => {
            return res.json(new ErrorResponseHelper("Hi, You are in the wrong place!"));
        });
    }
}