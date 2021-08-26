import axios from "axios";
import actions from './phonebookAction'

axios.defaults.baseURL = 'http://localhost:3000'

const fetchContacts = () => dispatch => {
        dispatch(actions.fetchContactsRequest());
        axios.get('/contacts')
        .then(({data})=> dispatch(actions.fetchContactsSuccess(data)))
        .catch(error => dispatch(actions.fetchContactsError(error)))
}
const btnValue = event => dispatch => {
        const contact = {
                valueName: event.target[0].value,
                valueNumber: event.target[1].value
        };
        dispatch(actions.valuephonebookRequest())
        axios.post('/contacts', contact)
        .then((respons) => dispatch(actions.valuephonebookSuccess(respons.data)))
        .catch(error => dispatch(actions.valuephonebookError(error)))
}

const deleteContact = event => dispatch => {
    const id = Number(event.target.id);
    dispatch(actions.deletephonebookRequest());
    axios.delete(`/contacts/${id}`)
    .then(() => dispatch(actions.deletephonebookSuccess(id)))
    .catch((error)=> dispatch(actions.deletephonebookError(error)))

}
const listOperations = { fetchContacts,btnValue,deleteContact };

export default listOperations