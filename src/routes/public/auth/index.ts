import RouterHelper from "../../../helpers/router.helper";
import AccountLoginRouter from "./local/account.login";
import AccountRegisterRouter from "./local/account.register";

export default class PublicAuthIndexRouter extends RouterHelper {
    autoLoad(): any {
    }

    router(): any {
        new AccountLoginRouter(this.app);
        new AccountRegisterRouter(this.app);
    }
}
