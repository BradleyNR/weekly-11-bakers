import React, {Component} from 'react';

class RecipeDisplay extends Component {
  render(){
    let recipeArray = this.props.recipeList;
    let recipeList = recipeArray.map((item, index) => {
      return <RecipeListItem key={index} recipe={item} />
    })

    return (
      <div>
        {recipeList}
      </div>
    )
  }
}

function RecipeListItem(props){
  let recipe = props.recipe;
  let ingredientComponents = recipe.ingredients.map(function(ingredient, index){
      return <Ingredients key={index} ingredient={ingredient} />
  });

  return (
    <div className='col-md-8 col-md-offset-2 recipe-card'>
      <section>
        <h1>{recipe.title}</h1>
        <h4>Feeds: {recipe.feeds}</h4>
        <ul>
          {ingredientComponents}
        </ul>
      </section>
    </div>
  )
}

function Ingredients(props){
  let ingredient = props.ingredient;
  return (
    <li>{ingredient.ingredientAmount} {ingredient.ingredientMeasure} {ingredient.ingredient}</li>
  )
}


export default RecipeDisplay;
