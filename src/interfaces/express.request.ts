import express from "express";
import Auth from "../services/auth";
import Crypt from "../services/crypt";
import Graphql from "../services/graphql";

export default interface ExpressRequest extends express.Request {
    auth: Auth
    crypt: Crypt
    graphql: Graphql
}