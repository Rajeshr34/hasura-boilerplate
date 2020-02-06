import ExpressRequest from "../interfaces/express.request";
import ExpressResponse from "../interfaces/express.response";
import express from "express";
import ErrorResponseHelper from "./error.response.helper";

//Express navigates all error/requests to here along with other class instances
//like user session, graphql more
//save logs by usersession, or date it depends on the requirements
export default class RouterLogger {

    constructor(err: any, req: ExpressRequest | any, error: boolean) {
        //@todo All Logs Goes Here
    }

    static logErrors(err: express.Errback, req: ExpressRequest | any, res: ExpressResponse, next: express.NextFunction) {
        new RouterLogger(err, req, true);
        res.json(new ErrorResponseHelper(err.toString()))
    }

    static logRequest(req: ExpressRequest | any, res: ExpressResponse, next: express.NextFunction) {
        new RouterLogger("", req, false);
        next();
    }
}