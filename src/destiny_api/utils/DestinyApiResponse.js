export default class DestinyApiResponse {
    constructor() {}

    static unwrap(response) {
        if (response.Response && response.Response.data) {
            return response.Response.data;
        } else if (response.Response) {
            return response.Response;
        } else {
            return response;
        }
    }

    static error(response) {
        console.log(err);
        return err;
    }
}