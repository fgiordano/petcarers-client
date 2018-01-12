import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class ReviewService {

  constructor(

  	private httpThang: Http

  	) { }

  newReview(componentInfo) {
      return this.httpThang
        .post(
          `${environment.apiBase}/api/reviews`,

          // Form body information to send to the back end (req.body)
          componentInfo,
          // Send the cookies across domains
          { withCredentials: true }
        )

        // Parse the JSON
        .map(res => res.json());
  } // close newReview()

  otherUserReviews(id) {
      return this.httpThang
        .get(
          `${environment.apiBase}/api/reviews/${id}`,

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Parse the JSON
        .map(res => res.json());
  } // close otherUserReviews()

} // close RviewService
