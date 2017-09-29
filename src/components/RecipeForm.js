import React, { Component } from 'react';

class RecipeForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      feeds: null,
      ingredients: []
    }
  }

  handleAddTitle = (e) => {
    e.preventDefault();
    this.setState({title: e.target.value});
    console.log('Title: ', this.state.title);
  }

  handleAddFeeds = (e) => {
    e.preventDefault();
    this.setState({feeds: e.target.value});
    console.log('Feeds: ', this.state.feeds);
  }

  handleCreateRecipe = (e) => {
    e.preventDefault();

    //pass in function from main as props and pass up the state and do the work on the main
    this.props.createRecipe('blah');
  }

  render(){
    return (
      <div class='recipe-form'>
        <form onSubmit={this.handleCreateRecipe}>
          <label htmlFor='recipe-title'>Recipe Name:</label>
          <input onChange={this.handleAddTitle} type="text" id='recipe-title' />
          <label htmlFor='feeds'>Feeds:</label>
          <input onChange={this.handleAddFeeds} type="number" id='feeds' min="1" max="16" />
          <label htmlFor='add-item'>Add Ingredient:</label>
          <input type='text' id='add-item'/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default RecipeForm;
