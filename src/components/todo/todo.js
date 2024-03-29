import React from 'react';
import uuid from 'uuid/v4';
import { When } from '../if';
import Modal from '../modal';
import { connect } from 'react-redux';

import { addItem, deleteItem, toggleComplete} from '../../store/todolist-reducer';
import { toggleDetails } from '../../store/item-reducer';

import './todo.scss';

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
    };
  }

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState(state => ({
      item: {...state.item, [name]: value},
    }));
  };

  handleSubmit = (e) => {
    this.props.handleSubmit(this.state.item);
  };

  addItem = (e) => {
    e.preventDefault();
    e.target.reset();

    const defaults = { _id: uuid(), complete:false };
    const item = Object.assign({}, this.state.item, defaults);
    
    this.props.addItem(item);
    this.setState(state => ({
      item: {}
    }))
  };

  deleteItem = id => {
    this.props.deleteItem(id);
  };

  toggleComplete = id => {
    this.props.toggleComplete(id);
  };

  toggleDetails = id => {
    let item = this.props.todoList.find(item => item._id === id);
    this.props.toggleDetails(item);
  }

  render() {
    console.log(this.props)
    return (
      <>
        <header>
          <h2>
            There are
            {this.props.todoList.filter( item => !item.complete ).length}
            Items To Complete
          </h2>
        </header>

        <section className="todo">

          <div>
            <h3>Add Item</h3>
            <form onSubmit={this.addItem}>
              <label>
                <span>To Do Item</span>
                <input
                  name="text"
                  placeholder="Add To Do List Item"
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                <span>Difficulty Rating</span>
                <input type="range" min="1" max="5" name="difficulty" defaultValue="3" onChange={this.handleInputChange} />
              </label>
              <label>
                <span>Assigned To</span>
                <input type="text" name="assignee" placeholder="Assigned To" onChange={this.handleInputChange} />
              </label>
              <label>
                <span>Due</span>
                <input type="date" name="due" onChange={this.handleInputChange} />
              </label>
              <button>Add Item</button>
            </form>
          </div>

          <div>
            <ul>
              { this.props.todoList.map(item => (
                <li
                  className={`complete-${item.complete.toString()}`}
                  key={item._id}
                >
                  <span onClick={() => this.toggleComplete(item._id)}>
                    {item.text}
                  </span>
                  <button onClick={() => this.toggleDetails(item._id)}>
                    Details
                  </button>
                  <button onClick={() => this.deleteItem(item._id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <When condition={this.props.showDetails}>
          <Modal title="To Do Item" close={this.toggleDetails}>
            <div className="todo-details">
              <header>
                <span>Assigned To: {this.props.details.assignee}</span>
                <span>Due: {this.props.details.due}</span>
              </header>
              <div className="item">
                {this.props.details.text}
              </div>
            </div>
          </Modal>
        </When>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    todoList: state.todoList,
    ...state.details,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: item => dispatch(addItem(item)),
    deleteItem: id => dispatch(deleteItem(id)),
    toggleComplete: id => dispatch(toggleComplete(id)),
    toggleDetails: id => dispatch(toggleDetails(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDo);
