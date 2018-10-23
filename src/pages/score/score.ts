import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, AlertController } from 'ionic-angular';
import { marksAndComments } from '../../uploadMarksAndComments';


declare var firebase;


@IonicPage()
@Component({
  selector: 'page-score',
  templateUrl: 'score.html',
})


export class ScorePage {
  logo:boolean;
  good:boolean;
  mood = 0;
  scoree:boolean;
  pass:boolean;
  description;
  rate;
  rateee:boolean;
 fail:boolean;
  email;
  score = 0
  scoreperc = 0;
  comment={
    description:'',
    rate:'',
    email:''}

    displayRatingButton : boolean;
    uploadComments : marksAndComments;
    postKey = ''
    CountQueuingStrategy
    qCount = 0
    arrayAnswers = [];
    public anArray:any = [];
  constructor( public navCtrl: NavController, public toastCtrl: ToastController, 
    public platform: Platform , public navParams: NavParams,private alertCtrl: AlertController) {
      this.rateee = false;
  
   this.scoree = true;
   this.logo = false;
   this.pass =true;
      this.score = navParams.get("score")
      this.postKey = navParams.get("postKey")
      this.qCount = navParams.get("qCount")
     this.scoreperc = (this.score/this.qCount)*100;

      console.log(this.score)

      this.uploadComments = new marksAndComments();
      if(this.scoreperc < 50){
        this.mood = 1;
      }
      else if(this.scoreperc < 75){
        this.mood = 2;
      }
      else if(this.scoreperc >= 75){
        this.mood = 3
      }

     this.displayRatingButton = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScorePage');
  }

  onModelChange(event){
    this.rate = event;
    console.log(event);
 
  }
  submit(){
    var commentsSent 
   this.logo = true;
    this.rateee = false;

    console.log(this.description);
    
    commentsSent = this.uploadComments.uploadComments(this.description, this.rate, this.postKey);
    console.log( commentsSent )
    if( commentsSent ){

        const toast = this.toastCtrl.create({
          message: 'comments has been sent successfully to admin...',
          showCloseButton: true,
          closeButtonText: 'Ok',
          position: 'middle'
        });
        toast.onDidDismiss(this.dismissHandler);
        toast.present(); 
    }
    



}
private dismissHandler() {
console.info('Toast onDidDismiss()');
}
cont(){
  this.navCtrl.push("TaskPage");
}
logout(){


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
        text: 'Log out',
        role: 'exitApp()',
        handler: () => {
        
            this.platform.exitApp(); // Close this application
            console.log("out!");
        }
    }]
});
alert.present();
}
ratee(){
this.rateee = true;
this.mood = 0;
this.displayRatingButton = false;

}
}
