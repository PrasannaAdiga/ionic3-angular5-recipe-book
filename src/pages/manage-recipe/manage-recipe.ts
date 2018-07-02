import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-manage-recipe',
  templateUrl: 'manage-recipe.html',
})
export class ManageRecipePage implements OnInit {
  mode: string = "New";
  levels: string[] = ['Easy', 'Medium', 'Difficult'];
  recipeForm: FormGroup;

  constructor(private navCtrl: NavController, 
    private navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required),
      'ingredients': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onManageIngredients() {
    const ingredientsActionSheet = this.actionSheetCtrl.create({
      'title': 'Please choose an action',
      buttons: [
        {
          text: 'Add an Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients?',
          role: 'destructive',
          handler: () => {
            const fArray = <FormArray>this.recipeForm.get('ingredients');
            const length = fArray.length;

            if(length > 0) {
              for(let i=length-1; i>=0; i--) {
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'All ingredients were deleted!',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    ingredientsActionSheet.present();
  }

  createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            if(data.name.trim() == '' || data.name == null) {
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid value!',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Item Added!',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    })
  }

}
