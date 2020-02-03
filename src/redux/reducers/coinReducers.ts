import { GET_ALL_COINS, LOADING, ERROR } from '../types/coinTypes';

const INITIAL_STATE: any = {
    coin: [],
    loading: false,
    error: ''
}

export default (state = INITIAL_STATE, action: any): any => {
    switch (action.type){
        case GET_ALL_COINS:
            return { 
                ...state,
                coin: action.payload,
                loading: false,
                error: '' }
        case LOADING:
            return { ...state, loading: true }
        case ERROR:
            return { ...state, 
                error: action.payload, 
                loading: false }
        default:
            return state;
    }
}
