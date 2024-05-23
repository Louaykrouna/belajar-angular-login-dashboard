import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from '../feedback/feedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { StarRatingComponent } from '../star-rating/star-rating.component';
import { RatingModule } from 'primeng/rating';

@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule
  ],
  exports:[FeedbackComponent]
})
export class SharedModule { }
