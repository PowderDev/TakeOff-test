import * as types from '../actionTypes'
import axios from 'axios'

export const getContacts = (userId: string, search?: string) => async (dispatch: any) => {
    const {data} = await axios.get(`http://localhost:4000/api/contact?userId=${userId}${search ? `&keyword=${search}` : ''}`)

    dispatch({
        type: types.GET_CONTACTS,
        payload: data.contacts
    })
}

export const addContact = (name: string, number: string, userId: string) => async (dispatch: any) => {
    const {data} = await axios.post('http://localhost:4000/api/contact', {name, number, userId})

    dispatch({
        type: types.CREATE_CONTACT,
        payload: data.contact
    })
}

export const updateContact = (name: string, number: string, id: string) => async (dispatch: any) => {
    const {data} = await axios.put(`http://localhost:4000/api/contact/${id}`, {name, number})

    dispatch({
        type: types.UPDATE_CONTACT,
        payload: data.updatedContact
    })
}

export const deleteContact = (id: string) => async (dispatch: any) => {
    await axios.delete(`http://localhost:4000/api/contact/${id}`)

    dispatch({
        type: types.UPDATE_CONTACT,
        payload: id
    })
}