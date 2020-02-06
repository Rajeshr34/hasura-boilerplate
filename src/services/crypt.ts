import Cryptr from 'cryptr';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as utility from "utility";
import fs from "fs";
import DateHelper from "../helpers/date.helper";

//Crypt is all about encryption, decryption
//Right now we are using JWT, RS512 algo
//Its two-step encryption even when we copy paste token in jwt.io data can'nt be seen on certain object values
export default class Crypt {

    public static instance(): Crypt {
        return new Crypt();
    }

    getPrivateKey = () => {
        return fs.readFileSync('./keys/private.key', 'utf8');
    };
    getPublicKey = () => {
        return fs.readFileSync('./keys/public.key', 'utf8');
    };

    getCrypt = () => new Cryptr(process.env.CRYPT_PASSWORD);

    enCrypt = (data: any) => {
        return this.getCrypt().encrypt(data);
    };

    deCrypt = (data: any) => {
        return this.getCrypt().decrypt(data);
    };

    generateJwt = (data: any, options?: any) => {
        options = options || {};
        options.algorithm = "RS512";
        return jwt.sign(data, this.getPrivateKey(), options);
    };

    decodeJwt = (data: any, options?: any) => {
        options = options || {};
        options.algorithm = "RS512";
        return jwt.verify(data, this.getPublicKey(), options);
    };

    generateJwtCode = (data: any) => {
        return jwt.sign(this.enCrypt(JSON.stringify(data)), process.env.CRYPT_PASSWORD, {algorithm: "HS512"});
    };

    decodeJtwCode = (data: any) => {
        const options = {
            algorithm: 'HS512'
        };
        // @ts-ignore
        return JSON.parse(this.deCrypt(jwt.verify(data, process.env.CRYPT_PASSWORD, options)));
    };


    hashPassword = (password: String) => bcrypt.hash(password, 10);

    validatePassword = (candidate: string, password: any) => bcrypt.compare(candidate, password);

    md5(data: string) {
        return utility.md5(data);
    }

    create_UUID() {
        let dt = DateHelper.now();
        return 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}
