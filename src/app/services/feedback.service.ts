import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://localhost:3000/api/reviews'; // Update with your actual base URL

  constructor(private http: HttpClient) {}

  sendReview(reviewData: { stars: number, comment: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/send`, reviewData);
  }

  getAllReviews(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
