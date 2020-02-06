import {keys} from "ts-transformer-keys";
import ObjectHelper from "../helpers/object.helper";

export interface UserInterface {
    id?: number
    first_name?: string
    last_name?: string
    email?: string
    password?: string
    role?: UserRoles
    status?: boolean
    create_at?: string
    update_at?: string
}

// converts interface to json object through typescript transformation
export function UserModel(): UserInterface|any {
    const keysList: any = keys<UserInterface>();
    return ObjectHelper.arrayToObject(keysList);
}

export enum UserRoles {
    ADMIN,
    USER = 1
}