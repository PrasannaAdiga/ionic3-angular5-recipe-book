import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-database-options',
  templateUrl: 'database-options.html',
})
export class DatabaseOptionsPage {

  constructor(private viewCtrl: ViewController) {}

  onAction(action: string) {
    console.log('clicked');
    this.viewCtrl.dismiss({action: action});
  }

}
