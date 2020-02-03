import Axios from "axios";
import { createUrl } from "../utils/createUrl";

export default class APIUser {
    public static login (user: any) {
        return Axios.post('/user/login', user)
    }

    public static register (user: any) {
        return Axios.post('/user',
            user
        );
    }
}