import React, {Component} from 'react';

import RecipeForm from './RecipeForm.js';
import RecipeDisplay from './RecipeDisplay.js';

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      recipeList: [
        {title: 'test', feeds: 3, ingredients: [{ingredient: 'beef'}, {ingredient: 'chicken'}]}
      ]
    }
  }

  createRecipe = (recipeData) => {
    let recipeState = this.state.recipeList;
    recipeState.push(recipeData)
    this.setState({recipeList: recipeState});
    console.log('new recipe: ', this.state.recipeList);
  }

  render(){
    return(
      <div className='container-fluid'>
        <RecipeForm createRecipe={this.createRecipe} />
        <RecipeDisplay recipeList={this.state.recipeList} />
      </div>
    )
  }
}

export default Main;
