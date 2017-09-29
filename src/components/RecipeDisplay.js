import React, {Component} from 'react';

class RecipeDisplay extends Component {
  render(){
    let recipeArray = this.props.recipeList;
    let recipeRender = recipeArray.map((item, index) => {
      return(
        <div key={index}>
          <h2>Title: {item.title}</h2>
          <h3>Feeds: {item.feeds}</h3>
          <p>{item.ingredients[0].ingredient}</p>
          <p>{item.ingredients[1].ingredient}</p>
        </div>
      )
    });

    return (
      <div>
        {recipeRender}
      </div>
    )
  }
}

export default RecipeDisplay;
