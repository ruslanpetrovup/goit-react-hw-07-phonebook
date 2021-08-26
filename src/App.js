import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Contacts from './components/Contacts';
import { connect } from 'react-redux';
import './index.css';
import actionPhonebook from './redux/phonebookAction'
import phonebookOperations from './redux/phonebookOperations';
import selectors from './redux/contacts-selectors'
var debounce = require('lodash.debounce');


const App = ({ error, btnValue, contacts, findContact, errorAlert }) => {
  if (error) {
    setTimeout(() => {
      errorAlert()
    }, 3000)
  }
  return (
    <>
      <header>
        <CSSTransition in={true} appear timeout={500} classNames="logo" >
          <h1 className="logo">Phonebook</h1>
        </CSSTransition>
        <CSSTransition in={error} timeout={500} classNames="error" unmountOnExit>
          <h1 className="error">Contact already exist</h1>
        </CSSTransition>
      </header>
      <main>
        <form onSubmit={btnValue} className="addForm">
          <p>Name</p>
          <input type="text" className="nameInp" />
          <p>Number</p>
          <input type="tel" className="numberInp" />
          <button type="submit" className="btnSub" >Add Contact</button>
        </form>
        {contacts.length > 0 ? <div className="filter">
          <p className="textFilter">Find contacts by name</p>
          <input type="text" className="filterInp" onChange={debounce(findContact, 1000)} />
        </div> : null}
        <div id="ListContacts">
          <Contacts/>
        </div>
      </main>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    error: selectors.getError(state),
    contacts: selectors.getContacts(state),
  }
}
const mapDispatchToprops = dispatch => {
  return {
    btnValue: (event) => {
      event.preventDefault()
      dispatch(phonebookOperations.btnValue(event))
      event.target[0].value = "";
      event.target[1].value = "";
    },
    findContact: (event) => {
      dispatch(actionPhonebook.findContact(event))
    },
    errorAlert: () => dispatch(actionPhonebook.errorAlert())
  }
}
export default connect(mapStateToProps,mapDispatchToprops)(App)