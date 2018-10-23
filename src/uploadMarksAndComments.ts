
declare var firebase;
export class marksAndComments{
    user;
    userEmail;
    databse;
    checkpoint = 0;
    key
    newPostKey
    successfull : boolean;
    constructor(){
        

        this.databse = firebase.database();


        firebase.database().ref('/registeredUsers/').on("value", (snapshot) =>{
            
            snapshot.forEach(e => {
                    if(this.userEmail == e.val().email)
                        this.key = e.key;
            });
      
          })
    }

    uploadMarks(score, task){
        this.user = firebase.auth().currentUser;
        this.userEmail = this.user.email;

        this.newPostKey = this.databse.ref('/My tasks answer/').push({task: task,email: this.userEmail,message : '', 
        marks: score, rating:''}).key;
        
        console.log(this.userEmail)

        console.log(this.newPostKey)
        this.messageIn();

        return this.newPostKey;
    }
    uploadComments(comment, ratings, key){
        
        if( comment == null){
            comment = ' '
        }

        if( ratings == null){
            ratings = ' '
        }
        var updates = {};
        updates['/My tasks answer/'+ key+'/message'] = comment;
        firebase.database().ref().update(updates);
        
        console.log(this.newPostKey)
        updates['/My tasks answer/'+ key+'/rating'] = ratings;
        firebase.database().ref().update(updates, (error) => {
            if (error) {
              // The write failed...
              this.successfull = false;
            } else {
              // Data saved successfully!
              this.successfull = true;
              console.log("Data has been writeen successfully!")
            }
          });
        return this.successfull;
    }

    messageIn(){

        this.databse = firebase.database();


        firebase.database().ref('/registeredUsers/').on("value", (snapshot) =>{
            
            snapshot.forEach(e => {
                    if(this.userEmail == e.val().email)
                        this.key = e.key;
            });
      
          })

        var updates = {};
        updates['/registeredUsers/' +this.key+ '/checkPoint'] = 1;
        return firebase.database().ref().update(updates);
    }
}