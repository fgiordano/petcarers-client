import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';

@Injectable()
export class SessionService {

  constructor(
    private httpThang: Http
  ) { }


  // an argument for each "req.body" in the API route
  signup(componentInfo) {
      return this.httpThang
        .post(
          `${environment.apiBase}/api/signup`,

          // Form body information to send to the back end (req.body)
          {
            signupUsername: componentInfo.username,
            signupEmail: componentInfo.email,
            signupPassword: componentInfo.password
          },

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Convert from observable to promise
        .toPromise()

        // Parse the JSON
        .then(res => res.json());
  } // close signup()


  login(componentInfo) {
      return this.httpThang
        .post(
          `${environment.apiBase}/api/login`,

          // Form body information to send to the back end (req.body)
          {
            blahEmail: componentInfo.email,
            blahPassword: componentInfo.password
          },

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Convert from observable to promise
        .toPromise()

        // Parse the JSON
        .then(res => res.json());
  } // close login()


  logout() {
      return this.httpThang
        .post(
          `${environment.apiBase}/api/logout`,

          // Nothing to send to the back end (req.body)
          {},

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Convert from observable to promise
        .toPromise()

        // Parse the JSON
        .then(res => res.json());
  } // close logout()


  checklogin() {
      return this.httpThang
        .get(
          `${environment.apiBase}/api/checklogin`,

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Convert from observable to promise
        .toPromise()

        // Parse the JSON
        .then(res => res.json());
  } // close checklogin()

}


// import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import { Observable } from 'rxjs/Observable';

// @Injectable()
// export class SessionService {

//   constructor(private http: Http) { }

//   handleError(e) {
//   	return Observable.throw(e.json().message);
//   }

//   signup(user) {
//   	return this.http.post(`/signup`, user)
//   	.map(res => res.json())
//   	.catch(this.handleError);
//   }

//   login(user) {
//   	return this.http.post(`login`, user)
//   	.map(res => res.json())
//   	.catch(this.handleError);
//   }

//   logout() {
//   	return this.http.post(`logout`, {})
//   	.map(res => res.json())
//   	.catch(this.handleError);
//   }

//   isLoggedIn() {
//   	return this.http.get(`/loggedin`)
//   	.map(res => res.json())
//   	.catch(this.handleError);
//   }

//   getPrivateData() {
//   	return this.http.get(`/private`)
//   	.map(res => res.json())
//   	.catch(this.handleError);
//   }

// }