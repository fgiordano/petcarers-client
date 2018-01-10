import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  errorMessage = "";

  logoutError = "";

  currentUser = {
  username: ''
  };

  formData = {
  	username: '',
  };

  petInfo = {
  	petName: '',
  	petAge: ''
  }

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
    private routerThang: Router
  ) { }

  ngOnInit() {
  	console.log("ARREGLO ANTES: ", this.petArray);
    this.authThang.checklogin()
      .then((userFromApi) => {
          this.currentUser = userFromApi	
          })
          
          // this.getThemCamels();
      .catch(() => {
          this.routerThang.navigate(['/']);
      });
      this.showPets()
  } // close ngOnInit()

  logMeOutPls() {
    this.authThang.logout()
      .then(() => {
          this.routerThang.navigate(['/']);
      })
      .catch(() => {
          this.logoutError = 'Log out went to 💩';
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
  			username: ' '
  		};
  		//clear error message
  		this.errorMessage = "",

  		//redirect to
  		this.routerThang.navigate(['/'])
  	})
  	.catch((err) => {
  		const parsedError = err.json();
  		this.errorMessage = parsedError.message + ' ';
  	});

  }

  showEditForm() {
    this.isShowingForm = true;
  } // close showEditForm()

  showAddPetForm() {
    this.isShowingAddPetForm = true;
  } // close showEditForm()

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
              petAge: ""
            };
            this.saveError = "";
        },
        (err) => {
            this.saveError = 'Don\'t be a dumb dog';
        }
      );
  } // close addPetNoPicture

  private addPetWithPicture() {
    this.myCoolUploader.onBuildItemForm = (item, form) => {
        form.append('cpetName', this.petInfo.petName);
        form.append('petAge', this.petInfo.petAge);
    };

    this.myCoolUploader.onSuccessItem = (item, response) => {
        console.log(item);
        const newPetFromApi = JSON.parse(response);
        this.petArray.push(newPetFromApi);
        this.isShowingAddPetForm = false;
        this.petInfo = {
          petName: "",
          petAge: ""
        };
        this.saveError = "";
    };

    this.myCoolUploader.onErrorItem = (item, response) => {
        console.log(item, response);
        this.saveError = 'Don\'t be a dumb dog';
    };

    // this is the function that initiates the AJAX request
    this.myCoolUploader.uploadAll();
  } // close saveCamelWithPicture

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
  } // close getThemCamels()



  
}