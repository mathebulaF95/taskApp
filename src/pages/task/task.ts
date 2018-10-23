import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, IonicApp } from 'ionic-angular';
import { retrieveTask } from '../../retreiveTasks';
import { Navbar } from 'ionic-angular/navigation/nav-interfaces';
import { Platform } from 'ionic-angular';

import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { QuestionsPage } from '../questions/questions';

@IonicPage()

@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  @ViewChild('navbar') navBar: Navbar;
  task 
  objectTask : any;
  taskState = false;
  logo:boolean;

  constructor(public navCtrl: NavController,public plt: Platform,private alertCtrl: AlertController,
    public navParams: NavParams, private nativePageTransitions: NativePageTransitions) {
    
    this.logo =false;
    this.objectTask = new retrieveTask();
    this.task = this.objectTask.returnTask();
    this.taskState = false; 
    console.log(this.objectTask.tasks)
    if(this.objectTask.tasks.length == 0)
    {
        this.taskState = true;
    }
  }
  questionsPage(type, timer, timerType){
    this.nativePageTransitions.fade(null)
    this.navCtrl.push("QuestionsPage",{task : type, time: timer, timerType : timerType });
  }
  power(){
    const alert = this.alertCtrl.create({
      title: 'App termination',
      message: 'Do you want to close the app?',
      buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
              console.log('Application exit prevented!');
          }
      },{
          text: 'Logout',
          role: 'exitApp()',
          handler: () => {
          
              this.plt.exitApp(); // Close this application
              console.log("out!");
          }
      }]
  });
  alert.present();
  
   
  }

  result(){
    let alert = this.alertCtrl.create({
      title: 'Test Results',
      message: 'Do you want to check your results?',
      buttons: [
        {
          text: 'Yes',
          role: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.navCtrl.push("ResultsPage")
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        }
      ]
    });
    alert.present();
  }
  
  
 }
