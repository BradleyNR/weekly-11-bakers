import React, {Component} from 'react';

import RecipeForm from './RecipeForm.js';
import RecipeDisplay from './RecipeDisplay.js';

import PARSE_URL, {HEADERS} from '../parse.js';

class Main extends Component {
  constructor(props){
    super(props);

    let user = localStorage.getItem('user');
    let userJSON = JSON.parse(user);

    this.state = {
      recipeList: [
        {title: '', feeds: '', ingredients: []},
      ],
      user: userJSON
    }
  }

  // get data from database and set state
  // data is passed down to RecipeDisplay for display purpose
  componentWillMount(){
    let username = this.state.user.username;
    // Building pointer per user to pull specific posts on logged in user
    let pointer = {
      "__type":"Pointer",
      "className":"_User",
      "objectId": this.state.user.objectId
    };

    // fetching user's posts
    fetch(PARSE_URL + '/classes/recipe/?where={"user":' + JSON.stringify(pointer) + '}', {
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
    let objId = this.state.user.objectId;

    fetch(PARSE_URL + '/classes/recipe', {
        headers: HEADERS,
        body: JSON.stringify({
          title: recipeData.title,
          feeds: parseInt(recipeData.feeds),
          ingredients: recipeData.ingredients,
          user: {
              "__type": "Pointer",
              "className": "_User",
              "objectId": objId
          }}),
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

  updateMainState = (state) => {
    this.setState({recipeList: state})
  }

  render(){
    return(
      <div className='container-fluid'>
        <RecipeForm createRecipe={this.createRecipe} user={this.state.user} />
        <div className=''>
          <RecipeDisplay recipeList={this.state.recipeList} updateMainState={this.updateMainState} />
        </div>
      </div>
    )
  }
}

export default Main;
