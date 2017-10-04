import React, { Component } from 'react';
import Modal from 'react-modal';


class RecipeForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      feeds: '',
      ingredient: '',
      ingredientAmount: '',
      ingredientMeasure: '',
      ingredients: [],
      modalOpenAdd: false
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

  handleIngredientAmount = (e) => {
    e.preventDefault();
    this.setState({ingredientAmount: e.target.value})
  }

  handleIngredientMeasure = (e) => {
    e.preventDefault();
    this.setState({ingredientMeasure: e.target.value})
  }


  handleAddIngredient = (e) => {
    e.preventDefault();

    //dont run if ingredient fields left blank
    if (this.state.ingredient === '' || this.state.ingredientAmount === '' || this.state.ingredientMeasure === '') {
      return
    }

    let ingredientsArray = this.state.ingredients;

    ingredientsArray.push({
      ingredient: this.state.ingredient,
      ingredientAmount: this.state.ingredientAmount,
      ingredientMeasure: this.state.ingredientMeasure
    });

    this.setState({ingredients: ingredientsArray, ingredient: '', ingredientAmount: '', ingredientMeasure: ''});
    console.log(this.state.ingredients);
  }

  handleIngredientRemove = (index, e) => {
    e.preventDefault();
    let ingredientsArray = this.state.ingredients;
    ingredientsArray.splice(index, 1)
    this.setState({ingredients: ingredientsArray});
  }

  handleAddModal = (e) => {
    e.preventDefault();
    console.log('open sesame');
    this.setState({modalOpenAdd: true})
  }

  handleCloseAddModal = (e) => {
    e.preventDefault();
    this.setState({modalOpenAdd: false})
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

    this.setState({title: '', feeds: '', ingredient: '', ingredients: [], modalOpenAdd: false});
  }

  render(){
    let ingredientsToAdd = this.state.ingredients.map((item, index) => {
      return(
        <div>
          <p className='ingredient-to-add col-md-8 col-md-offset-1'>{item.ingredientAmount} {item.ingredientMeasure} {item.ingredient}</p>
          <button onClick={this.handleIngredientRemove.bind(this, index)} className='col-md-2 col-md-offset-1 btn btn-danger ingredient-to-add-button'>Remove</button>
        </div>
      )
    })

    return (
      <div>
        <div className='recipe-header-area row'>
          <h1>Calcu-Baker</h1>
          {this.props.user ? <h4>Logged in as: {this.props.user.username}</h4> : null}
          <button onClick={this.handleAddModal} className='btn btn-primary col-md-4 col-md-offset-4'>Add Recipe</button>
        </div>


        <Modal isOpen={this.state.modalOpenAdd} shouldCloseOnOverlayClick={false} className='modal-window' contentLabel="Add Modal">

          <div className='recipe-form row'>
            <form onSubmit={this.handleCreateRecipe} className='col-md-12'>
              <label htmlFor='recipe-title' className='col-md-2'>Recipe:</label>
              <input onChange={this.handleAddTitle} className='col-md-6' type="text" id='recipe-title' value={this.state.title}/>
              <label htmlFor='feeds' className='col-md-2'>Feeds:</label>
              <input onChange={this.handleAddFeeds} className='col-md-2' type="number" id='feeds' min="1" value={this.state.feeds} />

              <label htmlFor='add-item' className='col-md-2'>Ingredient:</label>
              <input onChange={this.handleIngredientAmount} className='col-md-2' type="number" id='amount' min="1" value={this.state.ingredientAmount} />
              <input onChange={this.handleIngredientMeasure} className='col-md-4' type='text' id='measure' placeholder='Measurement (eg. tbs, cups)' value={this.state.ingredientMeasure}/>
              <input onChange={this.handleIngredient} className='col-md-4' type='text' id='add-item' placeholder='Ingredient' value={this.state.ingredient}/>

              <div className='recipe-form-button-row'>
                <button onClick={this.handleAddIngredient} className='col-md-3 btn btn-primary'>Add Ingredient</button>
                <input type="submit" value="Submit" className='col-md-3 col-md-offset-3 btn btn-success' />
                <button onClick={this.handleCloseAddModal} className='btn btn-danger col-md-3'>Cancel</button>
              </div>
            </form>

            <div className='ingredients-to-add-container row'>
              <h3>Ingredients:</h3>
            {ingredientsToAdd}
            </div>
          </div>

        </Modal>

      </div>

    )
  }
}

export default RecipeForm;
