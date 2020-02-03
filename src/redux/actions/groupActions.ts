import { Dispatch } from 'redux';
import { ipcRenderer } from 'electron';
import { LOADING_GET, GET_ALL_GROUPS, ERROR_GET } from '../types/groupTypes';

/**
 * @description obtiene los inventarios de el usuario
 */
export const getGroups = () => async (dispatch: Dispatch) =>{
    dispatch({
        type: LOADING_GET
    });

    ipcRenderer.once("onGetGroups", (evt, args) => {
        const { data, success, error_code } = args;
        
        if (success) {
            dispatch({
                type: GET_ALL_GROUPS,
                payload: data
            });
        } else {
            dispatch({
                type: ERROR_GET,
                payload: error_code
            });
        }
    })

    ipcRenderer.send("getGroups");
}
