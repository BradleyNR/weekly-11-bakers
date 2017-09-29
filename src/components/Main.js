import React, {Component} from 'react';

import RecipeForm from './RecipeForm.js';

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      recipeList: []
    }
  }

  createRecipe = (recipeData) => {
    let recipeState = this.state.recipeList;
    recipeState.push(recipeData)
    this.setState({recipeList: recipeState});
  }

  render(){
    return(
      <RecipeForm createRecipe={this.createRecipe} />
    )
  }
}

export default Main;
