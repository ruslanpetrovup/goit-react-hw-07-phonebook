import { combineReducers, createReducer } from '@reduxjs/toolkit';
import actions from './phonebookAction';
const shortid = require('shortid');

const {
    fetchContactsRequest,
    fetchContactsSuccess,
    fetchContactsError,
    valuephonebookRequest,
    valuephonebookSuccess,
    valuephonebookError,
    deletephonebookRequest,
    deletephonebookSuccess,
    deletephonebookError} = actions

const contactsReducer = createReducer(
{
    error: false,
    contacts: [],
    filter: [],
}, {
        [fetchContactsSuccess]: (state, { payload }) => {
         return state = {
                error: false,
                contacts: [...payload],
                filter: []
                }
        },
        [valuephonebookSuccess]: (state, { payload }) => {
        if (!isNaN(Number(payload.valueName))) {
            return state = {
                error: true,
                contacts: [...state.contacts],
                filter: []
                }
        }
            const name = payload.valueName;
            const number = Number(payload.valueNumber);
        if (name.length === 0 || number.length === 0) {
               return state = {
                error: true,
                contacts: [...state.contacts],
                filter: []
                }
            }
            if (typeof (name) !== 'string' || typeof (number) !== 'number' || isNaN(number)) {
                return state = {
                error: true,
                contacts: [...state.contacts],
                filter: []
                }
            }
            const testName = state.contacts.find((num) => {
                return num.name === name
            })
            const testNumber = state.contacts.find((num) => {
                return num.number === number
            })
            if (testName !== undefined || testNumber !== undefined) {
                return state = {
                error: true,
                contacts: [...state.contacts],
                filter: []
                }
            } else {
                return state = {
                error: false,
                contacts: [...state.contacts, { id: payload.id, valueName: name, valueNumber: number }],
                filter: []
            }
            }
        },
        [actions.errorAlert]: (state,_) => {
       return state = {
                error: false,
                contacts: [...state.contacts],
                filter: []
                }  
        },
        [deletephonebookSuccess]: (state, { payload }) => {
        const total = state.contacts.filter((num) => {
            return num.id !== payload
            })
        return state = {
            error: false,
            contacts: [...total],
            filter: []
        }
        },
        [actions.findContact]: (state, { payload }) => {
        if (payload === "") {
                return state = {
                error: false,
                contacts: [...state.contacts],
                filter: []
            }
                }
                const filter = state.contacts.filter(num => {
                return num.valueName.toLowerCase().includes(payload)
                })
                 return state = {
                error: false,
                contacts: [...state.contacts],
                filter: [...filter]
            }
        }
})
        
export default contactsReducer