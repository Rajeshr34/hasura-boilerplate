import ServerConfig from "../configs/server.config";
import Crypt from "../services/crypt";
import fs from "fs";

//Generate docker-compose.yml based on .env settings
const loadHasura = async () => {
    let jwtPublicKey = Crypt.instance().getPublicKey();
    let host  = "postgres";

    //postgres://postgres:@postgres:5432/postgres
    let db = "postgres://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD +"@postgres:5432/postgres ";
    let data = `version: '3.7'
services:
  postgres:
    image: postgres
    restart: always
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
    - "${process.env.DB_PORT}:5432"
    environment:
      POSTGRES_DB: 'postgres'
      POSTGRES_USER: '${process.env.DB_USER}'
      POSTGRES_PASSWORD: '${process.env.DB_PASSWORD}'
  graphql-engine:
    image: hasura/graphql-engine:v1.1.0-beta.2
    ports:
    - "${process.env.HASURA_PORT}:8080"
    depends_on:
    - "postgres"
    restart: always
    environment:
      HASURA_GRAPHQL_DATABASE_URL: ${db}
      HASURA_GRAPHQL_ENABLE_CONSOLE: "true" # set to "false" to disable console
      HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log
      ## uncomment next line to set an admin secret
      HASURA_GRAPHQL_ADMIN_SECRET: "${process.env.HASURA_ADMIN_SECRET}"
      HASURA_GRAPHQL_JWT_SECRET: '{"type": "RS512","key": "${jwtPublicKey}","claims_namespace": "${process.env.HASURA_CLIME_NAME_SPACE}","claims_format": "json"}'
      HASURA_GRAPHQL_UNAUTHORIZED_ROLE: "anonymous"
volumes:
  db_data:
`;
    fs.writeFileSync(ServerConfig.appRoot + "docker-compose.yml", data);
};

ServerConfig.loadSettings();
loadHasura().then(() => {
    console.log("Hasura File has been Generated");
});