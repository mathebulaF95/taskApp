import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { retrieveTask } from '../../retreiveTasks';

/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {

  person : FormGroup;
  object : retrieveTask;
  constructor(public navCtrl: NavController,fb : FormBuilder,private loadingCtrl: LoadingController,
     public navParams: NavParams ,public toastCtrl: ToastController,private alertCtrl: AlertController) {
    this.object = new retrieveTask();
    this.person = fb.group({
      email : ['',Validators.compose([Validators.required ,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['',]

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }

  signIN(ob){
    let loader = this.loadingCtrl.create({
      spinner: "ios",
      content:"Please Wait!",
      duration:1000
   });
  
   loader.present();

    firebase.auth().signInWithEmailAndPassword(ob.value.email,ob.value.password).then(User =>{
      this.navCtrl.push("TaskPage")
      console.log("You are in...")
 
     }).catch((error)=> {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
  
      const toast = this.toastCtrl.create({
        message: errorMessage,
        showCloseButton: true,
        closeButtonText: 'Ok',
        position: 'middle'
      });
      toast.onDidDismiss(this.dismissHandler);
      toast.present();  
    });
  }
  private dismissHandler() {
    console.info('Toast onDidDismiss()');
  }
   
  showForgot(){
    let prompt = this.alertCtrl.create({
      title: 'Enter Your Email',
      message: "A new password will be sent to your email",
      inputs:[
        {
          name: 'email',
          placeholder:'you@example.com'
        },
      ],
      buttons:[
        {
          text : 'Cancel',
          handler: data =>{
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data =>{
            //testing whether data is sent
            console.log("who are you-" + data.email);
            //add preloader
            let loading = this.loadingCtrl.create({
              dismissOnPageChange: true,
              content: 'Reseting your password..'
            });
            
            this.forgotPassWord(data.email).then(() =>{
              
            });
          }
        }
      ]
    });
    prompt.present();
  }

  forgotPassWord(email:any){
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => {
        let loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
          content: 'Reseting your password..'
        });
        // add toast
        loading.dismiss().then(() => {
          //show pop up
          let alert = this.alertCtrl.create({
            title: 'Check your email',
            subTitle: 'The link to reset has been sent to your email',
            buttons: ['OK']
          });
          alert.present();
        })
      }
    )
      .catch((error) => {
        let loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
          content: 'Reseting your password..'
        });
        // add toast
        loading.dismiss().then(() => {
          //show pop up
          let alert = this.alertCtrl.create({
            title: 'Error resetting password',
            subTitle: error,
            buttons: ['OK']
          });
          alert.present();
        })
      }
    )
  }
  
  
}
