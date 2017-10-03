import React, {Component} from 'react';
import Modal from 'react-modal';

import PARSE_URL, {HEADERS} from '../parse.js';

class RecipeDisplay extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    let recipeArray = this.props.recipeList;
    let recipeList = recipeArray.map((item, index) => {
      return <RecipeListItem key={index} recipe={item} recipeList={this.props.recipeList} uniqueId={item.objectId} updateMainState={this.props.updateMainState} index={index}/>
    })

    return (
      <div>
        {recipeList}
      </div>
    )
  }
}

class RecipeListItem extends Component {
  constructor(props){
    super(props);

    this.state = {
      modalOpen: false,
      recipe: this.props.recipe
    }
  }

  handleEditOpen = (e) => {
    e.preventDefault();
    this.setState({modalOpen: true});
  }

  handleEditClose = (e) => {
    e.preventDefault();
    this.setState({modalOpen: false})
  }

  handleDelete = (e) => {
    e.preventDefault();

    let uniqueId = this.props.uniqueId;


    fetch(PARSE_URL + '/classes/recipe/' + uniqueId, {
      headers: HEADERS,
      method: 'DELETE'
    }).then(response => {
    return response.json();
    }).then((message) => {

    let index = this.props.index
    let recipeList = this.props.recipeList;

    recipeList.splice(index, 1)
    this.props.updateMainState(recipeList);
    })
  }

  render(){
    let ingredientComponents = this.props.recipe.ingredients.map(function(ingredient, index){
        return <Ingredients key={index} ingredient={ingredient} />
    });

    let ingredientEdits = this.props.recipe.ingredients.map(function(ingredient, index){
        return <IngredientInputs key={index} ingredient={ingredient} id={index} />
    });

    return (
      <div className='col-md-8 col-md-offset-2 recipe-card'>
        <section className='recipe-info-box col-md-8'>
          <h1>{this.props.recipe.title}</h1>
          <h4>Feeds: {this.props.recipe.feeds}</h4>
          <ul>
            {ingredientComponents}
          </ul>
        </section>
        <div className='col-md-3 col-md-offset-1 recipe-change-box'>
          <button onClick={this.handleEditOpen} className='col-md-12 btn btn-success'>Edit</button>
          <button onClick={this.handleDelete} className='col-md-12 btn btn-danger'>Delete</button>
        </div>

        <Modal isOpen={this.state.modalOpen} shouldCloseOnOverlayClick={false}>

          <h1>Edit Recipe</h1>
          {ingredientEdits}
          <button onClick={this.handleEditClose}>Cancel</button>

        </Modal>

      </div>
  )}
}

function Ingredients(props){
  let ingredient = props.ingredient;
  return (
    <li>{ingredient.ingredientAmount} {ingredient.ingredientMeasure} {ingredient.ingredient}</li>
  )
}

// inputs for editing an ingredient
function IngredientInputs(props){
  let ingredient = props.ingredient;

  return (
    <div>
      <input name="qty" value={ingredient.ingredientAmount} />
      <input name="unit" value={ingredient.ingredientMeasure} />
      <input name="name" value={ingredient.ingredient} />
    </div>
  )
}


export default RecipeDisplay;




// class RecipeChangeForm extends Component {
//
//   handleUpdatedFeeds = (e) => {
//     e.preventDefault();
//     this.setState({updatedFeeds: e.target.value});
//   }
//
//   render(){
//     return(
//       <form>
//         <input onChange={this.updateFeeds} className='col-md-6' type="text" value='1'/>
//         <input type="submit" value="Submit" className='col-md-6 btn btn-primary' />
//       </form>
//     )
//   }
// }
