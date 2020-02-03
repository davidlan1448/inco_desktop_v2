import Axios from "axios";

export default class APIGroup {
    public static getGroups (ID: number) {
        return Axios.get(`group/myGroup/${ID}`);
    }
}
