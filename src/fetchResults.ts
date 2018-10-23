declare var firebase;

export class myResults{

   answers= []
   arrayLength = 0
   constructor(){
   }

   returnAnswers(){


    var user = firebase.auth().currentUser;
    var userEmail = user.email;

    firebase.database().ref('/My tasks answer/').once('value').then((snapshot) => {
    
        snapshot.forEach( snap =>{
            if(snap.val().email === userEmail){
                this.answers.push({marks:snap.val().marks, taskName:snap.val().task});
                this.arrayLength +=1;
               }
        })
        
    // ...
    });

    console.log( this.answers )
    return this.answers;

   }
}