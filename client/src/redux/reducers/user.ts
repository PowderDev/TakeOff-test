import * as types from '../actionTypes'

const init ={
    loading: false,
    error: '',
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '') : null,
}

export interface User {
    _id: string,
    email: string
}


export const userReducer = (state = init , action: {type: string, payload: any}) =>{
    switch(action.type){
        case types.USER_LOGIN_REQUEST:
            return {...state, loading: true, error: '' }

        case types.USER_LOGIN_SUCCESS: 
            return {...state, userInfo: action.payload.userInfo, loading: false, error: ''}
        
        case types.USER_LOGIN_FAIL:
            return {...state, loading: false, error: action.payload.error}   

        case types.USER_LOGOUT:
            return {} 
            
        case types.USER_REGISTER_REQUEST:
            return {...state, loading: true, error: '' }

        case types.USER_REGISTER_SUCCESS: 
            return {...state, userInfo: action.payload.userInfo, loading: false, error: ''}
        
        case types.USER_REGISTER_FAIL:
            return {...state, loading: false, error: action.payload.error}   

        default: return state    
    }
}