import RouterHelper from "../../../helpers/router.helper";
import RouterAuth from "../../../helpers/router.auth";
import ExpressRequest from "../../../interfaces/express.request";
import ExpressResponse from "../../../interfaces/express.response";

export default class AccountResetPasswordRouter extends RouterHelper {

    autoLoad(): any {

    }

    router(): any {
        this.app.post(this.getRoutes().RESET_PASSWORD, RouterAuth.isPublic, async (req: ExpressRequest | any, res: ExpressResponse) => {

        });
    }

}