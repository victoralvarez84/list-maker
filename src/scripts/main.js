import React from 'react';
import ReactDOM from 'react-dom';


//ListItem is a constant variable
const ListItem = React.createClass({

  handleClick: function() {
    this.props.onRemove(this.props.index);
  },

  render: function() {

    return (
      <li onClick={this.handleClick}>{this.props.name}</li>
    );
  }
});

const ListForm = React.createClass({

  saveComment: function (event) {
    event.preventDefault();
    this.props.onSaveComment(this.refs.name.value);
  },

  render: function() {
    return (<form onSubmit={this.saveComment}>
      <input type="text" ref="name" />
      <button type="submit">Save </button>
    </form>);
  }
});

const ListMaker = React.createClass({
  getInitialState: function () {
    return {
      names: this.props.names
    }
  },

  addName: function (newName) {
    let names = this.state.names.slice();
    names.push(newName);
    this.setState({
      names: names
    });
  },

  removeName: function (index) {
    let names = this.state.names.slice();
    names.splice(index, 1);
    this.setState({
      names: names
});
},


  render: function() {
    let listItems = this.state.names.map((item, i) => {
      return <ListItem key={i} name={item} index={i} onRemove={this.removeName} />
    });
    return (<div>
      <h1>List Maker</h1>
      <ul>
        {listItems}
      </ul>
      <ListForm onSaveComment={this.addName} />
    </div>);
  }
});

//VIRTUAL DOM
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ListMaker names={["Jeff", "Katrina", "Victor", "Travis"]} /> ,
    document.querySelector('.app')
  );
});
