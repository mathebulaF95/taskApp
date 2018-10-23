import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { network } from '../../network';
import { retrieveTask } from '../../retreiveTasks';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  @ViewChild(Slides) slides: Slides;


  splash = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    
  
  }

 

  goToSlide() {
    this.slides.slideTo(2, 500);
  }
  logIn(){
    this.navCtrl.push("LogInPage")
  }
  register(){
    this.navCtrl.push("RegisterPage");
  }

}
