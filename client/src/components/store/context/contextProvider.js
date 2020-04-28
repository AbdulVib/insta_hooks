import React, { useReducer } from 'react';
import Context from './context'

import axios from 'axios'

//reducer
import reducer, { initialState } from '../reducers/reducer'


export default function contextProvider(props) {
    
    const [ state, dispatch ] = useReducer(reducer, initialState)

    const addData = data => {
        dispatch( { type: 'ADD', payload: data } )
    }

    // console.log(prop, ' propsss')
    return (
        <Context.Provider value={{ state, dispatch, addData }}>
            { props.children }
        </Context.Provider>
    )
}

