import ExpressRequest from "../interfaces/express.request";
import ExpressResponse from "../interfaces/express.response";
import express from "express";

//suppose if urls want to give access to only if some permissions match you can declare those permissions here
// like here it have isUser and isPublic
//isPublic doesnt do any it just navigates to success
export default class RouterAuth {
    static isUser(req: ExpressRequest | any, res: ExpressResponse, next: express.NextFunction) {
        let authData = req.auth.isUserAuthenticated();
        if (!authData.error && req.auth.isUser()) {
            next();
        } else {
            return res.json(authData);
        }
    }

    static isPublic(req: ExpressRequest | any, res: ExpressResponse, next: express.NextFunction) {
        next();
    }
}