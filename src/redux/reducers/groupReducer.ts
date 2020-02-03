import { GET_ALL_INVENTORIES, LOADING, ERROR } from "../types/inventoriesTypes";

const INITIAL_STATE: any = {
    groups: [],
    loadingGetGroups: false,
    errorGetGroups: ''
}

export default (state = INITIAL_STATE, action: any): any => {
    switch (action.type){
        case GET_ALL_INVENTORIES:
            return { 
                ...state,
                groups: action.payload,
                loadingGetGroups: false,
                errorGetGroups: '' }
        case LOADING:
            return { ...state, loadingGetGroups: true }
        case ERROR:
            return { ...state, 
                errorGetGroups: action.payload, 
                loadingGetGroups: false }
        default:
            return state;
    }
}
