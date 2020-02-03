import { GET_ALL_COINS, LOADING, ERROR } from '../types/coinTypes';
import { Dispatch } from 'redux';
import { ipcRenderer } from 'electron';

export const getCoins = () => async (dispatch: Dispatch) =>{
    dispatch({
        type: LOADING
    });

    ipcRenderer.removeAllListeners("onGetCoins");
    ipcRenderer.on("onGetCoins", (evt, args) => {
        const { data, success } = args;
        
        if (success) {
            dispatch({
                type: GET_ALL_COINS,
                payload: data
            });
        } else {
            dispatch({
                type: LOADING
            });
        }
    })

    ipcRenderer.send("getCoins")
}
