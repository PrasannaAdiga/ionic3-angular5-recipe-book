import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, PopoverController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { IngredientsProvider } from '../../providers/ingredients/ingredients';
import { Ingredient } from '../../data/ingredient';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ingredients: any = []; 
  databaseOptions: any =  "DatabaseOptionsPage";

  constructor(public ingredientsProvider: IngredientsProvider,
    private popoverCtrl: PopoverController,
    private authService: AuthProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {}

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

  onShowOptions(event: MouseEvent) {
    const loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(this.databaseOptions);
    popover.present({ev: event});
    popover.onDidDismiss( (data) => {
      if(!data) {
        return;
      }
      if(data.action == 'Load') {
        loader.present();
        this.authService.getActiveUser().getIdToken()
          .then((token:string) => {
            this.ingredientsProvider.getList(token)
              .subscribe(
                (list: Ingredient[]) => {
                  loader.dismiss();  
                  this.ingredients = list;
                },
                error => {
                  loader.dismiss();
                  this.handleError(error.message);
                }
              );
          });
      } else if (data.action == 'Store') {
        loader.present();
        this.authService.getActiveUser().getIdToken()
          .then((token: string) => {
            this.ingredientsProvider.storeList(token)
            .subscribe(
              () => {
                loader.dismiss();
                const toaster = this.toastCtrl.create({
                  message: 'Data is saved!'
                });
                toaster.present();
              },
              error => { 
                loader.dismiss();
                this.handleError(error.message);
              }
            );
          });
      }
    })
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occured!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
}
