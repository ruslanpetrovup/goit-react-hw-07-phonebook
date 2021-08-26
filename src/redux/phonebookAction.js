import { createAction } from "@reduxjs/toolkit";

const fetchContactsRequest = createAction('fetchContactsRequest');
const fetchContactsSuccess = createAction('fetchContactsSuccess');
const fetchContactsError = createAction('fetchContactsError');

const valuephonebookRequest = createAction('value/phonebookRequest');
const valuephonebookSuccess = createAction('value/phonebookSuccess');
const valuephonebookError = createAction('value/phonebookError')

const deletephonebookRequest = createAction('delete/phonebookRequest');
const deletephonebookSuccess = createAction('delete/phonebookSuccess');
const deletephonebookError = createAction('delete/phonebookError')


const errorAlert = createAction("error/phonebook");


const findContact = createAction("find/phonebook", event => ({
        payload: event.target.value.toLowerCase(), 
}))

const ActionList = {
        fetchContactsRequest,
        fetchContactsSuccess,
        fetchContactsError,
        valuephonebookRequest,
        valuephonebookSuccess,
        valuephonebookError,
        deletephonebookRequest,
        deletephonebookSuccess,
        deletephonebookError,
        errorAlert,
        findContact
};

export default ActionList