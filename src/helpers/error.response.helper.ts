
//Call to show error msg to users in default json format
export default class ErrorResponseHelper {
    constructor(message: string, code?: any) {
        return {error: true, message, code}
    }
}