import {IncomingHttpHeaders} from "http";
import Crypt from "./crypt";
import {UserInterface, UserRoles} from "../interfaces/user.interface";
import ErrorResponseHelper from "../helpers/error.response.helper";

//Auth is for authenticate users from header token
//Auth generate token for users upon login
//Auth re-generate token from refresh-token
//Auth validate users roles
//AUth validate by user|email|mobile + password
//Auth generate token to access hasura server
export default class Auth {

    public crypt: Crypt;
    private headers: IncomingHttpHeaders;
    private userData: UserInterface;

    constructor(headers: IncomingHttpHeaders, crypt: Crypt) {
        this.crypt = crypt;
        this.headers = headers;
    }

    resets(){
        this.userData = null;
    }

    setHeaders(headers: any) {
        this.headers = headers;
        this.resets();
    }

    public async start() {
        if (this.headers && this.headers.authorization) {
            await this.validateToken(this.headers.authorization, false);
        }
    }

    init(data: { data: any }) {
        this.setUser(data.data);
    }

    public setUser(data: any) {
        this.userData = data;
    }

    isUser() {
        return this.getRoleType() === UserRoles.USER;
    }

    isUserEnabled() {
        return this.isUserLoggedIn() && this.userData.status === true;
    }

    isUserLoggedIn() {
        return this.userData != null && this.userData.id > 0;
    }

    getUserID() {
        return this.userData.id;
    }

    getUserData() {
        return this.userData;
    }

    getRoleType() {
        return this.userData.role;
    }

    validatePassword(password: string) {
        return this.crypt.validatePassword(password, this.userData.password);
    }

    // for Admin Or Client Or Any Other Types
    isUserAuthenticated(): { success?: boolean, error?: boolean, msg?: string } {
        if (this.isUserLoggedIn()) {
            if (this.isUserEnabled()) {
                return {success: true};
            } else {
                return new ErrorResponseHelper("AUTH_USER_DISABLED");
            }
        }
        return new ErrorResponseHelper("AUTH_NOT_AUTHENTICATED");
    }

    isAdmin() {
        if (this.isUserAuthenticated()) {
            if (this.getRoleType() === UserRoles.ADMIN) {
                return true;
            }
        }
    }

    //token generator
    //api user default | hasura user
    //hasura admin -> for self

    createUserToken(isRefreshToken: boolean, expireTime: String, claims?: any) {
        const userData = {
            id: this.userData.id,
            email: this.userData.email,
            role: this.userData.role,
            isRefreshToken
        };
        let encryptData: any = {data: this.crypt.enCrypt(JSON.stringify(userData))};
        if (claims && Object.keys(claims).length > 0) {
            encryptData[process.env.HASURA_CLIME_NAME_SPACE] = claims;
        }
        let jtwOptions = {};
        if (expireTime) {
            jtwOptions = {expiresIn: expireTime};
        }
        return `Bearer ${this.crypt.generateJwt(encryptData, jtwOptions)}`;
    }

    public setToken(data: any, claimsAppend?: any) {
        //claims
        let claims: any = {
            "x-hasura-allowed-roles": ["user"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": "" + this.getUserID(),
            "x-hasura-token": this.createUserToken(false, process.env.JWT_TOKEN_TIME, {}),
        };
        if (claimsAppend) {
            for (let key of Object.keys(claimsAppend)) {
                claims[key] = claimsAppend[key];
            }
        }

        data.token = this.createUserToken(false, process.env.JWT_TOKEN_TIME, claims);
        data.refreshToken = this.createUserToken(true, process.env.JWT_TOKEN_REFRESH_TIME);
        return data;
    }

    private async validateToken(authorization: string, refreshToken: boolean) {
        try {
            authorization = authorization.replace('Bearer ', '');
            const {data}: any = this.crypt.decodeJwt(authorization, {});
            const jsonData = JSON.parse(this.crypt.deCrypt(data));
            if (!jsonData.isRefreshToken || refreshToken) {
               let userID = jsonData.id;
               //@todo call hasura admin api and get request
            }
        } catch (e) {
            return {error: true, msg: e.message};
        }
        return {error: true, msg: "AUTH_INVALID_TOKEN"};
    }


}
