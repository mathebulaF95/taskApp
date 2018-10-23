import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScorePage } from './score';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ScorePage,
  ],
  imports: [
    IonicPageModule.forChild(ScorePage),
    Ionic2RatingModule
  ],
})
export class ScorePageModule {}
