import Axios from "axios";
import { createUrl } from "../utils/createUrl";

export default class APICoin {
    public static getCoins () {
        return Axios.get("/coin");
    }
}