import * as _ from 'underscore';

//
export default class ObjectHelper {

    static isJson(data: any) {
        let jsonParse: any | object = false;
        try {
            jsonParse = JSON.parse(data);
        } catch (e) {
            jsonParse = false;
        }
        return jsonParse;
    }

    static getObjectByKey(list: any, key: string) {
        let item = list[key];
        if (!item) {
            for (let keyItem of Object.keys(list)) {
                if (keyItem.toLowerCase() === key.toLowerCase()) {
                    item = list[keyItem];
                }
            }
        }
        return item;
    }

    static isWindows() {
        return process && (process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE));
    }

    static isMac() {
        return process && (process.platform === 'darwin');
    }

    static arrayToObject(keysList: any): any {
        return _.object(keysList, []);
    }

    static objectKeysFill(list: object|any) {
        Object.keys(list).forEach((key) => {
            list[key] = true
        });
        return list;
    }
}