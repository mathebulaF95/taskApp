import { Component } from '@angular/core';
import { Platform, AlertController, App, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "WelcomePage";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
     public toastCtrl: ToastController, public  app: App , public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      platform.registerBackButtonAction(() => {
 
        let nav = app.getActiveNavs()[0];
        let activeView = nav.getActive();                

        if(activeView.name === "TaskPage" || activeView.name ==="ScorePage" ) {

            // if (nav.canGoBack()){ //Can we go back?
            //     nav.pop();
            // } else {
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
                        handler: () => {
                            platform.exitApp(); // Close this application
                        }
                    }]
                });
                alert.present();
            // }
        }


        if( activeView.name ==="QuestionsPage"){
              const toast = this.toastCtrl.create({
              message: 'Complete the assessment first before you signout',
              duration: 3000,
              position: 'bottom'
            });
            
            toast.present();  
        }

        if(activeView.name === "LogInPage" || activeView.name ==="ResultsPage" || activeView.name ==="RegisterPage" ){
            nav.pop();
        }
    });


    });
  }
}

