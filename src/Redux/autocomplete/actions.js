import ACTIONS from './actionTypes';


export const setAutoComplete = ( autocomplete ) => {

    return {
        type: ACTIONS.SET,
        payload: {
            autocomplete
        }
    };

}
