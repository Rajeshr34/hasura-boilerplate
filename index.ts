import ServerConfig from "./src/configs/server.config";
import PublicIndexRouter from "./src/routes/public";
import RouterLogger from "./src/helpers/router.logger";

//Loads express, auth, crypt
//After that create a routes
//then its starts to listen requests on different ports
//api port is for get,put,delete,post
//socket port is for websocket
ServerConfig.getExpress().then(({server, app}) => {

    //All Routes Goes Here
    new PublicIndexRouter(app);

    app.use(RouterLogger.logErrors);

    app.listen(parseInt(process.env.API_PORT), () => {
        return console.log(`🚀 Express Server started at port: ${process.env.API_PORT}`);
    });

    server.listen(parseInt(process.env.SOCKET_PORT), () => {
        console.log(`🚀 Socket.io Server started at port: ${process.env.SOCKET_PORT}`);
    });
});

