import RouterHelper from "../../../helpers/router.helper";
import AccountResetPasswordRouter from "./account.reset.password";

export default class PublicConnectIndexRouter extends RouterHelper {
    autoLoad() {

    }

    router() {
        new AccountResetPasswordRouter(this.app);
    }
}