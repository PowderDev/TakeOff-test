import * as types from '../actionTypes'
import axios from 'axios'

export const login = ( email: string , password: string ) =>  async (dispatch: any) =>{
    try{
        dispatch({
            type: types.USER_LOGIN_REQUEST
        })

        const { data } = await axios.post('http://localhost:4000/api/login', { email, password })

        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: {
                userInfo: data.user
            }
        })

        localStorage.setItem('userInfo', JSON.stringify(data.user))
    } catch(err){
        dispatch({
            type: types.USER_LOGIN_FAIL,
            payload: {
                error: err.response.data.errorMessage
            }
        })
    }
}

export const logout = () => async (dispatch: any) =>{
    await axios.post('http://localhost:4000/api/logout')

    localStorage.removeItem('userInfo')
    dispatch({type: types.USER_LOGOUT})
}

export const register = ( email: string, password: string ) =>  async (dispatch: any) =>{
    try{
        dispatch({
            type: types.USER_REGISTER_REQUEST
        })

        const { data } = await axios.post('http://localhost:4000/api/register', { email, password })

        dispatch({
            type: types.USER_REGISTER_SUCCESS,
            payload: {
                userInfo: data.user
            }
        })

        localStorage.setItem('userInfo', JSON.stringify(data.user))
    } catch(err){
        dispatch({
            type: types.USER_REGISTER_FAIL,
            payload: {
                error: err.response.data.errorMessage
            }
        })
    }
}