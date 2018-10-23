import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Ionic2RatingModule } from 'ionic2-rating';
import { Network } from '@ionic-native/network';
import { MyApp } from './app.component';
import { LoadingController } from 'ionic-angular';


import { NativePageTransitions } from '@ionic-native/native-page-transitions'
@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    NativePageTransitions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
