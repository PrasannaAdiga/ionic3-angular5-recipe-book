import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageRecipePage } from './manage-recipe';

@NgModule({
  declarations: [
    ManageRecipePage,
  ],
  imports: [
    IonicPageModule.forChild(ManageRecipePage),
  ],
})
export class ManageRecipePageModule {}
