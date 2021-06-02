import * as types from '../actionTypes'

export interface IContact {
  name: string
  number: string
  _id: string
}

const contacts: Array<IContact> = []

const init = {
  contacts
}

export const contactReducer = (state = init, action: { type: string, payload?: any }): {contacts: IContact[]} => {
  switch(action.type) {
    case types.GET_CONTACTS:
      return { ...state, contacts: action.payload }
    case types.CREATE_CONTACT:
      const cts = [...state.contacts, action.payload]
      return { ...state, contacts: cts}
    case types.DELETE_CONTACT:
      const idx = contacts.findIndex(c => c._id === action.payload)
      const conts = contacts.slice(idx, 1)
      return {...state, contacts: conts}
    case types.UPDATE_CONTACT:
      return state
    default:
      return state
  }
}