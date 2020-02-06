import expressWs from "express";
import {RouterConfig} from "../configs/router.config";

//Abstract class to maintain same calls across all routers which inerts this class
export default abstract class RouterHelper {

    protected app: expressWs.Application | any;

    constructor(app: any) {
        this.app = app;
        this.autoLoad();
        this.router();
    }

    getRoutes() {
        return RouterConfig;
    }

    //to add some logic or middleware to selected router access this.app for the application context
    abstract autoLoad(): any;

    //Use this.app to access express application context
    abstract router(): any;
}