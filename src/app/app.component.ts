import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes-service.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit{
  name = 'Serious Cooker';
  recipesFiltered = [];
  recipesFilteredRandomized = [];
  loading = 'Randomizing your recipes!';
  urlRecipe = '';
  count = 0;

  constructor(private recipeService: RecipesService) {
  }

  public ngOnInit () {
    let recipes = this.recipeService.getRecipes();

    recipes.urlset.url.forEach(recipe => {
      if(recipe.loc.includes('/recipe')) {
        this.recipesFiltered.push(recipe.loc);
      }
    });
    this.recipesFilteredRandomized = this.shuffle(this.recipesFiltered);
    this.loading = 'All Randomized!';
  }

  public shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  
  public setUrl() {
    console.log(this.recipesFilteredRandomized[this.count]);
    this.urlRecipe = this.recipesFilteredRandomized[this.count];
    this.count++;
  }
}
