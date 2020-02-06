import {ApolloClient, DefaultOptions} from "apollo-client";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache, NormalizedCacheObject} from "apollo-cache-inmemory";
import fetch from "node-fetch";
import gql from "graphql-tag";
import ExpressRequest from "../interfaces/express.request";
import ExpressResponse from "../interfaces/express.response";
import ErrorResponseHelper from "../helpers/error.response.helper";
import RouterLogger from "../helpers/router.logger";

//This lib connect to hasura grphql and reads and write data to database
//Passing headers to get admin access
//if hasura fails to exec given cmd it logs the error in errorlogger class instance
export default class Graphql {
    private client: ApolloClient<NormalizedCacheObject>;
    private req: ExpressRequest | any;
    private res: ExpressResponse;

    constructor() {

    }

    async getRequest(queryString: string): Promise<{ data: any, error: boolean, msg: string }> {
        let runQuery = null;
        let error = false;
        let errorMsg = "";
        try {
            runQuery = await this.getClient()
            .query({
                query: gql`${queryString}`
            });
        } catch (e) {
            error = true;
            errorMsg = e.message;
            this.logError(e);
        }
        return {data: runQuery, error, msg: errorMsg};
    }

    async postRequest(queryString: string): Promise<{ data: any, error: boolean, msg: string }> {
        let runQuery = null;
        let error = false;
        let errorMsg = "";
        try {
            runQuery = await this.getClient()
            .mutate({
                mutation: gql`${queryString}`
            });
        } catch (e) {
            error = true;
            errorMsg = e.message;
            this.logError(e);
        }
        return {data: runQuery, error, msg: errorMsg};
    }

    private getClient() {
        if (!this.client) {
            let url = `http://localhost:${process.env.HASURA_PORT}/v1/graphql`;
            const link = new HttpLink({
                uri: url,
                fetch: fetch,
                headers: {
                    "content-type": "application/json",
                    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
                }
            });
            const defaultOptions: DefaultOptions = {
                watchQuery: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'ignore',
                },
                query: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'all',
                },
            };
            this.client = new ApolloClient({
                cache: new InMemoryCache(),
                link,
                defaultOptions
            });
        }
        return this.client;
    }

    setReq(req: ExpressRequest | any, res: ExpressResponse) {
        this.req = req;
        this.res = res;
    }

    private logError(e: any) {
        new RouterLogger(e, this.req, true);
        this.res.json(new ErrorResponseHelper(e.toString()));
    }
}