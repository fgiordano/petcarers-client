import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class EditUserService {

  constructor(
    private http: Http
  ) { }

  getUser() {
    return this.http
    .get(
      `${environment.apiBase}/api/user`,
      { withCredentials: true })
      .map( res => res.json());
    }

    updateUser(componentInfo) {
      return this.http
      .put(
        `${environment.apiBase}/api/user/edit`,
        {
          username: componentInfo.username
        },
        // Send the cookies across domains
        { withCredentials: true }
      )
      // Convert from observable to promise
      .toPromise()
      // Parse the JSON
      .then(res => res.json());
    } // close signup()
    deleteUser() {
      return this.http
      .delete(
        `${environment.apiBase}/api/user/delete`,
        // Send the cookies across domains
        { withCredentials: true }
      )
      // Convert from observable to promise
      .toPromise()
      // Parse the JSON
      .then(res => res.json());
    } // close signup()

  }