import React, {Component} from 'react';
import Modal from 'react-modal';
import Fraction from 'fraction.js';

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
      title: '',
      serving: '',
      newIngredients: '',
      feedsAmount: 0,
      originalFeeds: 0,
      ratio: 1,
      recipe: props.recipe
    }
  }

  componentDidMount = () => {
    this.setState({recipe: this.props.recipe, title: this.props.recipe.title, serving: this.props.recipe.feeds})
    console.log(this.state.recipe, this.state.title, this.state.serving);
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
    console.log(this.state.recipe);
    let recipe = this.state.recipe
    let objId = this.state.recipe.objectId;

    fetch(PARSE_URL + '/classes/recipe/' + objId, {
        headers: HEADERS,
        body: JSON.stringify({
          title: recipe.title,
          feeds: parseInt(recipe.feeds),
          ingredients: recipe.ingredients,
          }),
          method: 'PUT'
      }).then((resp) => {
        return resp.json();
      }).then((message) => {
        let recipeList = this.props.recipeList;
        recipeList[this.props.index] = recipe;
        this.props.updateMainState(recipeList);
        this.setState({modalOpen: false})
      });
  }

  handleNewTitle = (e) => {
    e.preventDefault();
    let recipe = this.state.recipe;
    recipe.title = e.target.value;
    this.setState({recipe: recipe});
  }

  handleNewFeeds = (e) => {
    e.preventDefault();
    let recipe = this.state.recipe;
    recipe.feeds = e.target.value;
    this.setState({recipe: recipe});
  }

  handleEditFeeds = (e) => {
    e.preventDefault();
    let firstAmount = this.state.originalFeeds;
    let newAmount = this.state.feedsAmount;
    let ratio = (newAmount / firstAmount);
    this.setState({feedsAmount: e.target.value, ratio: ratio});
    console.log(this.state.feedsAmount, this.state.originalFeeds, 'RATIO:', this.state.ratio);
  }

  onChangeAmount = (ingredient, index, e) => {
    let recipe = this.state.recipe;
    recipe.ingredients[index].ingredientAmount = e.target.value;
    this.setState({recipe: recipe});
  }

  onChangeMeasure = (ingredient, index, e) => {
    let recipe = this.state.recipe;
    recipe.ingredients[index].ingredientMeasure = e.target.value;
    this.setState({recipe: recipe});
  }

  onChangeName = (ingredient, index, e) => {
    let recipe = this.state.recipe;
    recipe.ingredients[index].ingredient = e.target.value;
    this.setState({recipe: recipe});
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
    let ingredientComponents = this.state.recipe.ingredients.map(function(ingredient, index){
        return <Ingredients key={index} ingredient={ingredient} />
    });

    let ingredientEdits = this.state.recipe.ingredients.map((ingredient, index) => {
        return <IngredientInputs key={index} ingredient={ingredient} id={index} onChangeAmount={this.onChangeAmount} onChangeMeasure={this.onChangeMeasure} onChangeName={this.onChangeName}/>
    });

    let ingredientEditAmount = this.state.recipe.ingredients.map((ingredient, index) => {
        return <IngredientAmountChange key={index} ingredient={ingredient} id={index} ratio={this.state.ratio}/>
    });

    return (
      <div className='col-md-8 col-md-offset-2 recipe-card'>
        <section className='recipe-info-box col-md-8'>
          <div className='recipe-info-title-section col-md-12'>
            <h1>{this.state.recipe.title}</h1>
          </div>
          <h4>Feeds: {this.state.recipe.feeds}</h4>
          <ul>
            {ingredientComponents}
          </ul>
        </section>
        <div className='col-md-3 col-md-offset-1 recipe-change-box'>
          <button onClick={this.handleEditAmountOpen} className='col-md-12 btn btn-primary'>Recalculate</button>
          <button onClick={this.handleEditOpen} className='col-md-12 btn btn-success'>Edit</button>
          <button onClick={this.handleDelete} className='col-md-12 btn btn-danger'>Delete</button>
        </div>

        <Modal isOpen={this.state.modalOpen} shouldCloseOnOverlayClick={false} className='modal-window' contentLabel="Update Modal">

          <h1>Edit Recipe</h1>
          <label htmlFor='title'>Title:</label>
          <input onChange={this.handleNewTitle} value={this.state.recipe.title} id='title'></input>
          <label htmlFor='feeds'>Feeds:</label>
          <input onChange={this.handleNewFeeds} value={this.state.recipe.feeds} id='feeds' className=''></input>
          {ingredientEdits}
          <button onClick={this.handleEditSubmit} className='btn btn-success'>Submit</button>
          <button onClick={this.handleEditClose} className='btn btn-danger'>Cancel</button>

        </Modal>

        <Modal isOpen={this.state.modalChangeAmountOpen} shouldCloseOnOverlayClick={false} className='modal-window' contentLabel="Change Amount Modal">

          <h1>Calculate!</h1>
          <h2>Recipe: {this.state.recipe.title}</h2>
          <label htmlFor='feedsEdit'>Edit The Portion:</label>
          <input onChange={this.handleEditFeeds} className='input-lg' type="number" id='feedsEdit' min="1" value={this.state.feedsAmount} />
          {ingredientEditAmount}
          <button onClick={this.handleEditAmountClose} className='btn btn-danger'>Close</button>

        </Modal>

      </div>
  )}
}


function Ingredients(props){
  let ingredient = props.ingredient;
  return (
    <li class='ingredient-li'>{ingredient.ingredientAmount} {ingredient.ingredientMeasure} {ingredient.ingredient}</li>
  )
}

// inputs for editing an ingredient
class IngredientInputs extends Component{

  render(){
    let ingredient = this.props.ingredient;
    let index = this.props.id;

    // TODO: SET VALUE = TO STATE, THEN TAKE STATE AND USE IT TO BUILD AN OBJECT AND EDIT THE DATABASE
    // TODO: CANT USE ON CHANGE HERE, ASK DAN WHAT TO DO
    return (
      <div>
        <input onChange={this.props.onChangeAmount.bind(this, ingredient, index)} name="qty" value={ingredient.ingredientAmount} />
        <input onChange={this.props.onChangeMeasure.bind(this, ingredient, index)} name="unit" value={ingredient.ingredientMeasure} />
        <input onChange={this.props.onChangeName.bind(this, ingredient, index)} name="name" value={ingredient.ingredient} />
      </div>
    )
  }
}

function IngredientAmountChange(props){
  let ingredient = props.ingredient;
  let ratio = props.ratio;

  let newIngredientAmount = ingredient.ingredientAmount * ratio;

  let x = new Fraction(newIngredientAmount);
  let res = x.toFraction(true);

  return (
    <div className='row ingredient-row'>
      <p className='col-md-4'>{res}</p>
      <p className='col-md-4'>{ingredient.ingredientMeasure}</p>
      <p className='col-md-4'>{ingredient.ingredient}</p>
    </div>
  )
}


export default RecipeDisplay;
