import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class PetService {

  constructor(

    private httpThang: Http
  ) { }


  newPet(componentInfo) {
      return this.httpThang
        .post(
          `${environment.apiBase}/api/pets`,

          // Form body information to send to the back end (req.body)
          componentInfo,

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Parse the JSON
        .map(res => res.json());
  } // close newCamel()


  allPets() {
      return this.httpThang
        .get(
          `${environment.apiBase}/api/pets`,

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Parse the JSON
        .map(res => res.json());
  } // close allCamels()

}