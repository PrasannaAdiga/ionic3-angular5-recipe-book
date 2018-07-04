import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage } from 'ionic-angular';
import { IngredientsProvider } from '../../providers/ingredients/ingredients';
import { Ingredient } from '../../data/ingredient';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ingredients: Ingredient[] = []; 
  
  constructor(public ingredientsProvider: IngredientsProvider) {}

  ionViewWillEnter() {
    this.loadShoppingList();
  }
  
  onCreateShoppingList(form: NgForm) {
    this.ingredientsProvider.addIngredient(form.value.ingredientName, 
      form.value.amount);
      form.reset();
      this.loadShoppingList();
  }

  removeIngredient(index: number) {
    this.ingredientsProvider.removeIngredient(index);
    this.loadShoppingList();
  }

  loadShoppingList() {
    this.ingredients = this.ingredientsProvider.getAllIngredients();
  }

}
