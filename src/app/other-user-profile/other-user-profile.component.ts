
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../environments/environment';

import { SessionService } from '../session.service';
import { EditUserService } from '../edit-user.service';
import { PetService } from '../pet.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.css']
})
export class OtherUserProfileComponent implements OnInit {

isShowingReviewForm: boolean = false;

otherUser = {
  username: ''
  };

currentUser = {
  username: ''
  };

petArray: any[] = [];

  constructor(
    private authThang: SessionService,
    private editThang: EditUserService,
    private petThang: PetService,
    private route: ActivatedRoute,
    private routerThang: Router
  	) { }

  ngOnInit(){
  	console.log("this is the params", this.route.params._value['id'])
  	this.route.params.subscribe((params) =>{ 
  		this.showOtherUser(params['id'])
  	});
  }

  showOtherUser(id) {
  		// if(this.route.params._value.id === undefined){
	    this.editThang.getUser(id)
	      .subscribe((userFromApi) => {
	          this.otherUser = userFromApi	
	          })

	    this.showPets(id);

	    this.authThang.checklogin()
	      .then((userFromApi) => {
	          this.currentUser = userFromApi	
	          })     
	      .catch(() => {
	          this.routerThang.navigate(['/']);
	      });
  }

  showPets(id) {
    this.petThang.otherUserPets(id)
      .subscribe(
        (allOtherUserPets) => {
        	allOtherUserPets.forEach((pet)=>{
            	this.petArray.push(pet);
        	})
        	console.log("pets =", this.petArray);
        },
        () => {
            this.petListError = 'Sorry no pets';
        }
      );
  }

  showReviewForm() {
    this.isShowingReviewForm = true;
  }

  //  showCurrentUser(id) {
  //   this.editThang.getUser(id)
  //     .subscribe((user) => {
  //     	this.currentUser = user;
  //     });
  // }

  } // close ngOnInit()


