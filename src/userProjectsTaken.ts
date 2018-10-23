

declare var firebase;

export class tasksTaken{
    
    userTaskTaken(task){

        var user = firebase.auth().currentUser;
        var userID = user.uid;
        console.log(userID)
        console.log(task)
        firebase.database().ref('/'+userID+'/').push({taskName: task})
    }


}