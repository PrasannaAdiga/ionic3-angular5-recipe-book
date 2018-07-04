import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../data/recipe';
import { IngredientsProvider } from '../../providers/ingredients/ingredients';
import { RecipesProvider } from '../../providers/recipes/recipes';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;
  manageRecipePage = "ManageRecipePage";

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private ingredientsService: IngredientsProvider,
    private recipeService: RecipesProvider) {
  }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    this.navCtrl.push(this.manageRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index});
  }

  onAddIngredientsToShoppingList() {
    this.ingredientsService.addIngredients(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }
}
