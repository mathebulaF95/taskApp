import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import 'rxjs/add/observable/interval';
import { tasksTaken } from '../../userProjectsTaken';
import { marksAndComments } from '../../uploadMarksAndComments';
import { selectedTaskName } from '../../taskName';



declare var firebase;
@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {

  timerVar;
  timerS:number;
  timerM:number;
  timerH:number;

  timer : number;
  timerType : string;


  objectUser : tasksTaken;
  uploadMarks : marksAndComments;
  questionNumber = 0

  public solution 	: FormGroup;
  taskName:''

  questions = [{
    question:'',
    questionType:''
  }]

  arrayAnswers = []
  score = 0;
  time =0;
  public anArray:any=[];

  checkPoint = 0;
  countingQuestions = 0;
  postKey =''
  constructor(public navCtrl: NavController,public platform: Platform, 
    public navParams: NavParams, private fb   : FormBuilder,public toastCtrl: ToastController) {


    this.objectUser = new tasksTaken();
    this.uploadMarks = new marksAndComments();
    

    this.taskName = navParams.get("task")
    this.timer = navParams.get("time")
    this.timerType = navParams.get("timerType")

    console.log(this.timer)
    
    this.objectUser.userTaskTaken(this.taskName);
    

    firebase.database().ref('/'+this.taskName+'/').on("value", (snapshot) =>{
            
      this.questions  = []
      this.countingQuestions = 0;
          console.log("Array not empty")
      snapshot.forEach(e => {
              this.countingQuestions += 1;
              this.questions.push({question: e.val().question , questionType:e.val().questionType })

              this.arrayAnswers.push(e.val().answer)
      });

    })

      if( this.timerType === 'Seconds'){
          this.startTimer( this.timer, 0 , 0);
      }
      if( this.timerType === 'Minutes'){
        this.startTimer( 0, this.timer , 0);
      }
      if( this.timerType === 'Hour'){
        this.startTimer( 0, 0 , this.timer);
      }
  }


  goTo(){
    console.log('this.anArray',this.anArray);

      var counter

      for(counter = 0; counter < this.anArray.length; counter++){

        if(this.anArray[counter].toLowerCase() === this.arrayAnswers[counter].toLowerCase() )
            this.score +=1;
      }


    this.timerVar.unsubscribe()
    
    this.postKey = this.uploadMarks.uploadMarks((this.score/this.countingQuestions)*100, this.taskName);
    this.navCtrl.push("ScorePage",{score: this.score, postKey: this.postKey, qCount: this.countingQuestions})
  }

  startTimer( seconds , minutes , hour){

    this.timerS = seconds;
    this.timerM = minutes;
    this.timerH = hour;
  
  
    this.timerVar = Observable.interval(1000).subscribe(() =>{
      

      if( (this.timerS === 0) && (this.timerM > 0) ){
        this.timerM -=1;
        this.timerS = 60;
      }
      if( (this.timerM == 0) && (this.timerS == 0) && this.timerH > 0){
          this.timerH -=1;
          this.timerM = 59;
          this.timerS = 60;
      }

      this.timerS--;
      if( (this.timerS === 0 ) && (this.timerM  === 0) && ( this.timerH === 0) ){
        this.timerVar.unsubscribe();
        
        this.postKey = this.uploadMarks.uploadMarks(this.score, this.taskName);
        this.navCtrl.push("ScorePage",{score: this.score, postKey: this.postKey})
        

        
      }
    })
    
  }
}
