import RouterHelper from "../../../../helpers/router.helper";
import RouterAuth from "../../../../helpers/router.auth";
import ExpressRequest from "../../../../interfaces/express.request";
import ExpressResponse from "../../../../interfaces/express.response";
import {UserInterface, UserModel, UserRoles} from "../../../../interfaces/user.interface";
import ObjectHelper from "../../../../helpers/object.helper";
import {jsonToGraphQLQuery} from 'json-to-graphql-query';

export default class AccountRegisterRouter extends RouterHelper {

    autoLoad(): any {

    }

    router(): any {
        this.app.post(this.getRoutes().REGISTER, RouterAuth.isPublic, async (req: ExpressRequest | any, res: ExpressResponse) => {

            let body: UserInterface = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password ? await req.crypt.hashPassword(req.body.password) : null,
                status: false,
                email: req.body.email,
                role: UserRoles.USER,
            };
            let returnBody = ObjectHelper.objectKeysFill(UserModel());
            const mutation = {
                mutation: {
                    insert_users: {
                        __args: {
                            objects: body
                        },
                    },
                    returning: returnBody
                }
            };
            const graphql_query = jsonToGraphQLQuery(mutation, {pretty: true});
            let {error, data} = await req.graphql.postRequest(graphql_query);
            if (!error)
                return res.json(data);
        });
    }

}