import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm!: FormGroup;
  reviews: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private feedbackService: FeedbackService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getAllReviews();
    this.feedbackForm = this.formBuilder.group({
      stars: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['']
    });
  }

  submitReview() {
    if (this.feedbackForm.valid) {
      this.loading = true;
      this.feedbackService.sendReview(this.feedbackForm.value).subscribe(
        () => {
          this.getAllReviews();
          this.feedbackForm.reset();
          this.loading = false;
        },
        error => {
          this.error = "Error submitting review";
          console.error('Error submitting review:', error);
          this.loading = false;
        }
      );
    }
  }

  getAllReviews() {
    this.feedbackService.getAllReviews().subscribe(
      (data: any) => {
        this.reviews = data.reviews;
      },
      error => {
        this.error = "Error fetching reviews";
        console.error('Error fetching reviews:', error);
      }
    );
  }
}
