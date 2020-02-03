import { LOGIN, LOADING, ERROR, REGISTER, REGISTER_LOADING, REGISTER_ERROR, REGISTER_CLEAN, LOGIN_CLEAN, LOADING_USER_LOGGED } from '../types/usuariosTypes';

const INITIAL_STATE = {
    user: {},
    isLoggued: false,
    loading: false,
    error: '',
    loadingUserLogged: true,

    responseRegister: '',
    registerLoading: false,
    registerError: ''
}

interface LoginProps{
    login: any;
}

export default (state = INITIAL_STATE, action: any): LoginProps | any => {
    switch (action.type){
        case LOADING_USER_LOGGED: 
            return {
                ...state,
                loadingUserLogged: true
            }
        case LOGIN:
            return { 
                ...state,
                user: action.payload,
                isLoggued: Object.keys(action.payload).length !== 0,
                loading: false,
                loadingUserLogged: false,
                error: '' }
        case LOADING:
            return { ...state, loading: true }
        case ERROR:
            return { ...state, 
                error: action.payload, 
                loading: false }
        case LOGIN_CLEAN:
            return { ...state,
                user: '',
                isLoggued: false,
                error: '',}
        case REGISTER:
            return { 
                ...state,
                responseRegister: action.payload,
                registerLoading: false,
                error: '' }
        case REGISTER_LOADING:
            return { ...state, registerLoading: true }
        case REGISTER_ERROR:
            return { ...state, 
                registerError: action.payload, 
                registerLoading: false }
        case REGISTER_CLEAN:
            return { ...state,
                responseRegister: '',
                registerError: '',}
        default:
            return state;
    }
}