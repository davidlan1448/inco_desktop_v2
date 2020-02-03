import {
  GET_ALL_INVENTORIES,
  LOADING,
  ERROR,
  REGISTER_INVENTORY,
  LOADING_REGISTER,
  ERROR_REGISTER,
  UPDATE_INVENTORIES,
  CLEAR_RESPONSE
} from "../types/inventoriesTypes";

const INITIAL_STATE: any = {
  inventories: [],
  loading: false,
  error: "",

  responseRegister: "",
  loadingRegister: false,
  errorRegister: ""
};

export default (state = INITIAL_STATE, action: any): any => {
  switch (action.type) {
    case UPDATE_INVENTORIES:
      return {
        ...state,
        inventories: action.payload
      };
    case GET_ALL_INVENTORIES:
      return {
        ...state,
        inventories: action.payload,
        loading: false,
        error: ""
      };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: action.payload, loading: false };
    case REGISTER_INVENTORY:
      return {
        ...state,
        responseRegister: action.payload,
        loadingRegister: false,
        errorRegister: ""
      };
    case LOADING_REGISTER:
      return { ...state, loadingRegister: true };
    case ERROR_REGISTER:
      return {
        ...state,
        errorRegister: action.payload,
        loadingRegister: false
      };
    case CLEAR_RESPONSE:
      return {
        ...state,
        responseRegister: ""
      };
    default:
      return state;
  }
};
