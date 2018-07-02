import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  manageRecipePage: any = "ManageRecipePage";

  constructor(private navCtrl: NavController) {}
  
  onNewRecipe() {
    this.navCtrl.push(this.manageRecipePage, {mode: 'New'});
  }
}
