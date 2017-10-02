import React, {Component} from 'react';

import RecipeForm from './RecipeForm.js';
import RecipeDisplay from './RecipeDisplay.js';

import PARSE_URL, {HEADERS} from '../parse.js';

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      recipeList: []
    }
  }

  // get data from database and set state
  // data is passed down to RecipeDisplay for display purpose
  componentDidMount(){
    fetch(PARSE_URL + '/classes/recipe/', {
      headers: HEADERS
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log('data from server: ', data.results);
      this.setState({recipeList: data.results})
    })
  }

  // send to database
  createRecipe = (recipeData) => {
    fetch(PARSE_URL + '/classes/recipe', {
        headers: HEADERS,
        body: JSON.stringify({title: recipeData.title, feeds: parseInt(recipeData.feeds), ingredients: recipeData.ingredients}),
        method: 'POST'
      }).then((resp) => {
        return resp.json();
      }).then((message) => {
        let recipeState = this.state.recipeList;
        recipeState.push(recipeData)
        this.setState({recipeList: recipeState});
        console.log('new recipe: ', this.state.recipeList);
      });
  }

  render(){
    return(
      <div className='container-fluid'>
        <RecipeForm createRecipe={this.createRecipe} />
        <div className=''>
          <RecipeDisplay recipeList={this.state.recipeList} />
        </div>
      </div>
    )
  }
}

export default Main;
