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
      modalChangeAmountOpen: false,
      recipe: this.props.recipe,
      newTitle: '',
      newServing: '',
      newIngredients: [],
      feedsAmount: 10,
      originalFeeds: 0,
      ratio: 1
    }
  }

  componentDidMount = () => {
    this.setState({recipe: this.props.recipe})
  }

  handleEditOpen = (e) => {
    e.preventDefault();
    this.setState({modalOpen: true});
  }

  handleEditClose = (e) => {
    e.preventDefault();
    this.setState({modalOpen: false})
  }

  handleEditAmountOpen = (e) => {
    e.preventDefault();
    this.setState({modalChangeAmountOpen: true, feedsAmount: this.props.recipe.feeds, originalFeeds: this.props.recipe.feeds});
  }

  handleEditAmountClose = (e) => {
    e.preventDefault();
    this.setState({modalChangeAmountOpen: false, ratio: 1})
  }

  handleEditSubmit = (e) => {
    e.preventDefault();
  }

  handleNewTitle = (e) => {
    e.preventDefault();
    this.setState({newTitle: e.target.value});
  }

  handleNewFeeds = (e) => {
    e.preventDefault();
    this.setState({newServing: e.target.value});
  }

  // TODO: FINISH THIS, ASK DAN
  handleNewIngredient = (e) => {
    e.preventDefault();
    let ingredientArray = this.state.newIngredients;
  }

  handleEditFeeds = (e) => {
    e.preventDefault();
    let firstAmount = this.state.originalFeeds;
    let newAmount = this.state.feedsAmount;
    let ratio = (newAmount / firstAmount);
    this.setState({feedsAmount: e.target.value, ratio: ratio});
    console.log(this.state.feedsAmount, this.state.originalFeeds, 'RATIO:', this.state.ratio);
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

    let ingredientEditAmount = this.props.recipe.ingredients.map((ingredient, index) => {
        return <IngredientAmountChange key={index} ingredient={ingredient} id={index} ratio={this.state.ratio}/>
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
          <button onClick={this.handleEditAmountOpen} className='col-md-12 btn btn-primary'>View</button>
          <button onClick={this.handleEditOpen} className='col-md-12 btn btn-success'>Edit</button>
          <button onClick={this.handleDelete} className='col-md-12 btn btn-danger'>Delete</button>
        </div>

        <Modal isOpen={this.state.modalOpen} shouldCloseOnOverlayClick={false} className='modal-window' contentLabel="Update Modal">

          <h1>Edit Recipe</h1>
          <label htmlFor='title'>Title:</label>
          <input onChange={this.handleNewTitle} value={this.props.recipe.title} id='title'></input>
          <label htmlFor='feeds'>Feeds:</label>
          <input onChange={this.handleNewFeeds} value={this.props.recipe.feeds} id='feeds'></input>
          {ingredientEdits}
          <button onClick={this.handleEditSubmit} className='btn btn-success'>Submit</button>
          <button onClick={this.handleEditClose} className='btn btn-danger'>Cancel</button>

        </Modal>

        <Modal isOpen={this.state.modalChangeAmountOpen} shouldCloseOnOverlayClick={false} className='modal-window' contentLabel="Change Amount Modal">

          <h1>Calculate!</h1>
          <h2>Recipe: {this.props.recipe.title}</h2>
          <label htmlFor='feedsEdit'>Edit The Portion:</label>
          <input onChange={this.handleEditFeeds} className='' type="number" id='feedsEdit' min="1" value={this.state.feedsAmount} />
          {ingredientEditAmount}
          <button onClick={this.handleEditAmountClose} className='btn btn-danger'>Close</button>

        </Modal>

      </div>
  )}
}

// TODO: NEW DEIVIDED BY OLD SET TO STATE USE AS RATIO

function Ingredients(props){
  let ingredient = props.ingredient;
  return (
    <li>{ingredient.ingredientAmount} {ingredient.ingredientMeasure} {ingredient.ingredient}</li>
  )
}



// inputs for editing an ingredient
function IngredientInputs(props){
  let ingredient = props.ingredient;

  // TODO: SET VALUE = TO STATE, THEN TAKE STATE AND USE IT TO BUILD AN OBJECT AND EDIT THE DATABASE
  // TODO: CANT USE ON CHANGE HERE, ASK DAN WHAT TO DO
  return (
    <div>
      <input name="qty" value={ingredient.ingredientAmount} />
      <input name="unit" value={ingredient.ingredientMeasure} />
      <input name="name" value={ingredient.ingredient} />
    </div>
  )
}

function IngredientAmountChange(props){
  let ingredient = props.ingredient;
  let ratio = props.ratio;

  let newIngredientAmount = ingredient.ingredientAmount * ratio;

  return (
    <div className='row ingredient-row'>
      <p className='col-md-4'>{newIngredientAmount}</p>
      <p className='col-md-4'>{ingredient.ingredientMeasure}</p>
      <p className='col-md-4'>{ingredient.ingredient}</p>
    </div>
  )
}


export default RecipeDisplay;
