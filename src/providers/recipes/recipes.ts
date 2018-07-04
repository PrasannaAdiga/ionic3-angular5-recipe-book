import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../../data/recipe';
import { Ingredient } from '../../data/ingredient';

@Injectable()
export class RecipesProvider {
  recipes: Recipe[] = [];

  addRecipe(title: string, description: string,
    difficulty: string, ingredients: Ingredient[]) {
      this.recipes.push(new Recipe(title, description, difficulty, ingredients));
      console.log(this.recipes);
  };

  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipe(index: number,
    title: string, description: string,
    difficulty: string, ingredients: Ingredient[]) {
      this.recipes[index] = new Recipe(title, description, difficulty, ingredients); 
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }
}
