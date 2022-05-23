import ACTIONS from './actionTypes';


const initialState = [];


 const reducer = ( state = initialState, { type, payload } ) => {

    switch( type )
    {
        case ACTIONS.SET:
            return setAutoComplete( payload.autocomplete )

        default:
            return state;
    }

};

const setAutoComplete = ( autocomplete ) => {
    let tmp = autocomplete.slice( 0, 5 );
    // add LocationKey to the location object because the API response keys are not consistent
    tmp.map( ( location ) => location.LocationKey = location.Key );

    return tmp;

}

export default reducer;
