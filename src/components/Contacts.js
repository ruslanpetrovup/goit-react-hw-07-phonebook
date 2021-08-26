import React,{Component} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import phonebookOperation from '../redux/phonebookOperations';
import selectors from '../redux/contacts-selectors'
import '../index.css';
// import { render } from '@testing-library/react';

class Contact extends Component {
  componentDidMount() {
    this.props.fetchCont()
  }
  render() {
    return <>
          {this.props.filter.length > 0 ? <TransitionGroup component="ul" classNames="TaskList">
        {
                this.props.filter.map((num) => {
                return (
                    <CSSTransition key={num.id} timeout={250}  classNames="TaskList-item">
                        <li className="TaskList-item" id={num.id}><p>{num.valueName}</p><p>{num.valueNumber}</p>
                            <button id={num.id} type="button" className="btndel" onClick={this.props.delet}>
                                Delete
                            </button>
                            </li>
                    </CSSTransition>
                )
            })
        }
        </TransitionGroup> : <TransitionGroup component="ul" classNames="TaskList">
        {
                this.props.contacts.map((num) => {
                return (
                    <CSSTransition key={num.id} timeout={250}  classNames="TaskList-item">
                          <li className="TaskList-item" id={num.id}><p>{num.valueName}</p><p>{num.valueNumber}</p>
                            <button id={num.id} type="button" className="btndel" onClick={this.props.delet}>
                                Delete
                            </button>
                          </li>
                    </CSSTransition>
                )
            })
        }
        </TransitionGroup>}
        </>
  }
}
const mapStateToProps = (state) => {
  return {
    contacts: selectors.getContacts(state),
    filter: selectors.getFilter(state)
  }
}
const mapDispatchToprops = dispatch => { 
  return {
    delet: (event) => {
      dispatch(phonebookOperation.deleteContact(event))
    },
    fetchCont: () => dispatch(phonebookOperation.fetchContacts())
  }
}
export default connect(mapStateToProps,mapDispatchToprops)(Contact)