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
  } // close newPet()


  allPets() {
      return this.httpThang
        .get(
          `${environment.apiBase}/api/pets`,

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Parse the JSON
        .map(res => res.json());
  } // close allPets()

  otherUserPets(id) {
      return this.httpThang
        .get(
          `${environment.apiBase}/api/pets/${id}`,

          // Send the cookies across domains
          { withCredentials: true }
        )

        // Parse the JSON
        .map(res => res.json());
  } // close otherUserPets()

  updatePet(componentInfo, id) {
    console.log("component info it this:", componentInfo)
      return this.httpThang
      .put(
        `${environment.apiBase}/api/pets/${id}`,
        {
          petName: componentInfo.petName,
          petAge: componentInfo.petAge
        },
        // Send the cookies across domains
        { withCredentials: true }
      )
      // Convert from observable to promise
      .toPromise()
      // Parse the JSON
      .then(res => res.json());
  } // close updatePet()

  deletePet(id) {
      return this.httpThang
      .delete(
        `${environment.apiBase}/api/pets/${id}`,
        // Send the cookies across domains
        { withCredentials: true }
      )
      // Convert from observable to promise
      .toPromise()
      // Parse the JSON
      .then(res => res.json());
  } // close deletePet()

}