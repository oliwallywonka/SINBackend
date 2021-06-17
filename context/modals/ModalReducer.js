import {MODAL_SHOW, MODAL_HIDE} from '../../types';

const reducer = (state, action) => {
    switch(action.type) {
        case MODAL_SHOW:
            return {
                ...state,
                visible: true,
                name: action.name,
                payload:action.payload
            }
        case MODAL_HIDE:
            return {
                ...state,
                visible: false,
                name: '',
                payload:null
            }
        default:
            return state;
    }
}

export default reducer