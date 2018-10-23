declare var firebase;

export class retrieveTask{

    tasksNames = [{
        taskName:'',
        timer:"",
        timerType:""
    }]

    userClickedTask = [{
        taskName:"",
        timer:"",
        timerType:""
    }]

    tasks = []
    
    counter = 0;

    constructor(){
        

          firebase.database().ref('/tasks/').on("value", (snapshot) =>{
            
            this.tasksNames  = []
            snapshot.forEach(e => {
                    console.log(e.val().taskName)
                    if( e.val().taskName != '')
                        this.tasksNames.push({taskName: e.val().taskName, timer: e.val().timer, timerType : e.val().timerType})
            });
          })
          this.userTask()
    }

    userTask(){
 
        var user = firebase.auth().currentUser;

        if(user != null){
                var userID = user.uid;
                
                firebase.database().ref('/'+userID+'/').on("value", (snapshot) =>{
                        
                    snapshot.forEach(e => {
                            this.userClickedTask.push({taskName: e.val().taskName, timer: e.val().timer, timerType : e.val().timerType})
                            console.log(e.val().taskName)
                    });
                })

                var count;

                for( count = 0; count < this.tasksNames.length; count++){

                        this.userClickedTask.forEach( e=> {

                                if( e.taskName != ''){
                                    
                                    if(e.taskName == this.tasksNames[count].taskName )
                                    return;
                                    
                                    this.counter +=1;
                                }
                        })

                        if((this.userClickedTask.length-1) == this.counter)
                            this.tasks.push({taskName : this.tasksNames[count].taskName, timer: this.tasksNames[count].timer , timerType: this.tasksNames[count].timerType})
                        
                            
                        this.counter = 0;
                }
            }
    }

    returnTask(){
        console.log(this.tasks)
        return this.tasks;
    }

}