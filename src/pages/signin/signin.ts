import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthProvider, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  onSignin(form: NgForm) {
    const loader = this.loadingCtrl.create({
      content: 'Singing you In...'
    });
    loader.present();
    this.authService.signIn(form.value.email, form.value.password)
      .then(data => {
        loader.dismiss();
      })
      .catch(error => {
        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signing In Failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
}
