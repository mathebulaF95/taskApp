import {Observable} from 'rxjs/Observable';


export class timerClass{

  timerVar;
  timerVar1;
  timerVar2;
  timerVal;
  timerS:number;
  timerM:number;
  timerH:number;


    startTimer(){
  
  
        this.timerVar = Observable.interval(1000).subscribe(() =>{
          this.timerS--;
        })
      
        this.timerVar1 = Observable.interval(60000).subscribe(() =>{
          this.timerM--;
          if(this.timerM == 0){
            this.timerM = 59;
          }
        })
        this.timerVar2 = Observable.interval(3600000).subscribe(() =>{
          this.timerH--;
          if(this.timerH == 0){
            this.timerH--;
          }
        })
      
        
      }


      
}