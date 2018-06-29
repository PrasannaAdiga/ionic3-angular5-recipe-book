import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../../data/ingredient';

@Injectable()
export class IngredientsProvider {
  private ingredients: Ingredient[] = [];

  addIngredient(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  getAllIngredients() {
    return this.ingredients.slice();
  }

  removeIngredient(index: number){
    this.ingredients.splice(index, 1);
  }

}
