import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from "path";
import expressWs from "express-ws";
import {createServer, Server} from "http";
import Auth from "../services/auth";
import Crypt from "../services/crypt";
import ExpressRequest from "../interfaces/express.request";
import Graphql from "../services/graphql";
import ExpressResponse from "../interfaces/express.response";
import RouterLogger from "../helpers/router.logger";

//Its base of all, ServerConfig loads all the necessary data lib, class's
//its create instance and point|refers to every requests
export default class ServerConfig {
    static appRoot: any;
    static storage: any;
    static logs: any;

    public static async getExpress() {
        // Load Basic
        this.loadSettings();

        let auth = new Auth(null, Crypt.instance());
        let graphql = new Graphql();

        const appExpress = express();
        appExpress.use(helmet());
        appExpress.use(cors());
        // console.log("DIR PATH : ",__dirname);
        appExpress.use(bodyParser.urlencoded({extended: true}));
        appExpress.use(bodyParser.json());
        appExpress.use(async (req: ExpressRequest | any, res: ExpressResponse, next: express.NextFunction) => {
            // @ts-ignore
            auth.setHeaders(req.headers);
            await auth.start();

            graphql.setReq(req,res);

            req.auth = auth;
            req.crypt = auth.crypt;
            req.graphql = graphql;



            RouterLogger.logRequest(req,res,next);
        });
        const server: Server = createServer(appExpress);

        const {app} = expressWs(appExpress);
        return {server, app};
    }

    public static loadSettings() {
        // Load .env File
        dotenv.config();
        
        //Save App Root Path
        ServerConfig.appRoot = path.resolve(__dirname + '/../../') + "/";
        ServerConfig.storage = ServerConfig.appRoot + process.env.STORAGE;
        ServerConfig.logs = ServerConfig.storage + '/logs/';
    }
}
