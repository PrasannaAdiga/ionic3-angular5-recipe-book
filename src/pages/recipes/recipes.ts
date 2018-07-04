import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { RecipesProvider } from '../../providers/recipes/recipes';
import { Recipe } from '../../data/recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  manageRecipePage: any = "ManageRecipePage";
  recipePage: any = "RecipePage";
  recipes: Recipe[] = [];

  constructor(private navCtrl: NavController, private recipesService: RecipesProvider) {}
  
  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(this.manageRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(this.recipePage, {recipe: recipe, index: index});
  }
}
