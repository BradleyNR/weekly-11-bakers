import React, { Component } from 'react';

class RecipeForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      feeds: '',
      ingredient: '',
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

  handleIngredient = (e) => {
    e.preventDefault();
    this.setState({ingredient: e.target.value})
    console.log('Ingredient: ', this.state.ingredient);
  }

  handleAddIngredient = (e) => {
    e.preventDefault();
    let ingredientsArray = this.state.ingredients;
    ingredientsArray.push({ingredient: this.state.ingredient});
    this.setState({ingredients: ingredientsArray, ingredient: ''});
    console.log(this.state.ingredients);
  }

  handleCreateRecipe = (e) => {
    e.preventDefault();
    //define recipe
    let recipeInfo = {
      title: this.state.title,
      feeds: this.state.feeds,
      ingredients: this.state.ingredients
    }
    //pass in function from main as props and pass up the state and do the work on the main
    this.props.createRecipe(recipeInfo);

    this.setState({title: '', feeds: '', ingredient: '', ingredients: []});
  }

  render(){
    let ingredientsToAdd = this.state.ingredients.map((item, index) => {
      return(
        <p className='ingredient-to-add col-md-8 col-md-offset-2'>{item.ingredient}</p>
      )
    })
    return (
      <div className='recipe-form row'>
        <form onSubmit={this.handleCreateRecipe} className='col-md-8 col-md-offset-2'>
          <label htmlFor='recipe-title' className='col-md-2'>Recipe Name:</label>
          <input onChange={this.handleAddTitle} className='col-md-8' type="text" id='recipe-title' value={this.state.title}/>
          <label htmlFor='feeds' className='col-md-1'>Feeds:</label>
          <input onChange={this.handleAddFeeds} className='col-md-1' type="number" id='feeds' min="1" max="16" value={this.state.feeds} />
          <label htmlFor='add-item' className='col-md-2'>Add Ingredient:</label>
          <input onChange={this.handleIngredient} className='col-md-10' type='text' id='add-item' value={this.state.ingredient}/>
          <button onClick={this.handleAddIngredient} className='col-md-4 btn btn-primary'>Add Ingredient</button>
          <input type="submit" value="Submit" className='col-md-4 col-md-offset-4 btn btn-primary' />
        </form>
        <div className='ingredients-to-add-container row'>
        {ingredientsToAdd}
        </div>
      </div>
    )
  }
}

export default RecipeForm;
