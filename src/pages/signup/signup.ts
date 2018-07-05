import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthProvider, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  onSignup(form: NgForm) {
    const loader = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loader.present();
    this.authService.signUp(form.value.email, form.value.password)
      .then(data => { 
        loader.dismiss();
      })
      .catch(error => { 
        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed!',
          message: error.message,
          buttons: ['Ok']
        })
        alert.present();
      });
  }
}
