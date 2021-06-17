import React, { useReducer } from 'react';
import ModalReducer from './ModalReducer';
import ModalContext from './ModalContext';

import { MODAL_SHOW,MODAL_HIDE} from '../../types';

const ModalState = props => {
    const initialState = {
        visible: false,
        name: '',
        payload:null
    }

    const [ state, dispatch ] = useReducer(ModalReducer, initialState);

    // Funciones
    const showModal = (payload=null,name='') => {
        dispatch({
            type: MODAL_SHOW,
            payload: payload,
            name: name
        });

    }

    const hideModal = () => {
        dispatch({
            type:MODAL_HIDE,
        })
    }


    return (
        <ModalContext.Provider
            value={{
                visible: state.visible,
                name: state.name,
                payload: state.payload,
                showModal,
                hideModal
            }}
        > 
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalState;