import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { environment } from '../../environments/environment';

import { SessionService } from '../session.service';
import { EditUserService } from '../edit-user.service';
import { PetService } from '../pet.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  isShowingForm: boolean = false;

  isShowingAddPetForm: boolean = false;

  isShowingEditPetForm: boolean = false;

  errorMessage = "";

  logoutError = "";

  currentUser:any = {};

  formData:any = {};

  petInfo:any = {};

  petArray: any[] = [];

  myCoolUploader = new FileUploader({
    url: environment.apiBase + '/api/pets',
    itemAlias: 'petPicture'
  });

  saveError: string;

  petListError: string;


  constructor(
    private authThang: SessionService,
    private editThang: EditUserService,
    private petThang: PetService,
    private route: ActivatedRoute,
    private routerThang: Router
  ) { }

  ngOnInit() {
  	// if(this.route.params._value.id === undefined){
	    this.authThang.checklogin()
	      .then((userFromApi) => {
	          this.currentUser = userFromApi	
	          })
	          
	          // this.getThemCamels();
	      .catch(() => {
	          this.routerThang.navigate(['/']);
	      });
	      this.showPets()
	  // }
	  // else
	  // {
	  	// console.log("ELSEEEEE", this.route.params._value.id)
	  	// this.showOtherUser(this.route.params._value.id);
	  // }
  } // close ngOnInit()

  logMeOutPls() {
    this.authThang.logout()
      .then(() => {
          this.routerThang.navigate(['/']);
      })
      .catch(() => {
          this.logoutError = 'Log out went wrong';
      });
  } // close logMeOutPls()

  deleteUser(){
  	this.editThang.deleteUser()
  	.then((resultFromApi) => {
  		//clear error message
  		this.errorMessage = "",

  		//redirect to 
  		this.routerThang.navigate(['/']);
  	})
  	.catch((err) => {
  		const parsedError = err.json();
  		this.errorMessage = parsedError.message + ' ';
  	});
  }

  updateUser(){
  	this.editThang.updateUser(this.formData)
  	.then((resultFromApi) => {
  		//clear form
  		this.formData = {
  			username: ' ',
        aboutme: ' '
  		};
  		//clear error message
  		this.errorMessage = "",

  		//redirect to
  		this.routerThang.navigate(['/user'])
  	})
  	.catch((err) => {
  		const parsedError = err.json();
  		this.errorMessage = parsedError.message + ' ';
  	});

  }

  showEditForm() {
    this.isShowingForm = true;
  }

  showAddPetForm() {
    this.isShowingAddPetForm = true;
  }

  showEditPetForm() {
    this.isShowingEditPetForm = true;
  }

  addNewPet() {
    // if no picture, regular AJAX upload
    if (this.myCoolUploader.getNotUploadedItems().length === 0) {
      this.addPetNoPicture();
    }

    // else, upload pictures with uploader
    else {
      this.addPetWithPicture();
    }
  } // close addNewPet()

  private addPetNoPicture() {
    this.petThang.newPet(this.petInfo)
      .subscribe(
        (newPetFromApi) => {
            this.petArray.push(newPetFromApi);
            this.isShowingAddPetForm = false;
            this.petInfo = {
              petName: "",
              petAge: "",
              petAbout: "",
              petBreed: ""
            };
            this.saveError = "";
        },
        (err) => {
            this.saveError = 'Don\'t be a silly dog';
        }
      );
  } // close addPetNoPicture

  private addPetWithPicture() {
    this.myCoolUploader.onBuildItemForm = (item, form) => {
        form.append('petName', this.petInfo.petName);
        form.append('petAge', this.petInfo.petAge);
        form.append('petBreed', this.petInfo.petBreed);
        form.append('petAbout', this.petInfo.petAbout);
    };

    this.myCoolUploader.onSuccessItem = (item, response) => {
        console.log(item);
        const newPetFromApi = JSON.parse(response);
        this.petArray.push(newPetFromApi);
        this.isShowingAddPetForm = false;
        this.petInfo = {
          petName: "",
          petAge: "",
          petBreed: "",
          petAbout: ""
        };
        this.saveError = "";
    };

    this.myCoolUploader.onErrorItem = (item, response) => {
        console.log(item, response);
        this.saveError = 'Don\'t be a silly dog';
    };

    // this is the function that initiates the AJAX request
    this.myCoolUploader.uploadAll();
  } // close addPetlWithPicture

  showPets() {
    this.petThang.allPets()
      .subscribe(
        (allThePets) => {
        	allThePets.forEach((pet)=>{
            	this.petArray.push(pet);
        	})
        	console.log("pets =", this.petArray);
        },
        () => {
            this.petListError = 'Sorry no pets';
        }
      );
  } // close showPets()

  updatePet(){
    console.log("this is the pet info:", this.petInfo)
    this.petThang.updatePet(this.petInfo, this.petInfo[0])
    .then((resultFromApi) => {
      //clear form
      this.petInfo = {
        petName: ' ',
        petAge: ' '
      };
      //clear error message
      this.errorMessage = "",

      //redirect to
      this.routerThang.navigate(['/api/user/'])
    })
    .catch((err) => {
      const parsedError = err.json();
      this.errorMessage = parsedError.message + ' ';
    });

  } // close updatePet


  // showOtherUser(id) {
  //   this.editThang.getUser(id)
  //     .subscribe((user) => {
  //     	this.currentUser = user;
  //     });
  // }

  
}