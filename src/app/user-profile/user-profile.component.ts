import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { environment } from '../../environments/environment';
import { EditUserService } from '../edit-user.service';
// import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  isShowingForm: boolean = false;

  errorMessage = "";

  logoutError = "";

  currentUser = {
  username: ''
  };

  constructor(
    private authThang: SessionService,
    private editThang: EditUserService,
    private routerThang: Router
  ) { }

  ngOnInit() {
    this.authThang.checklogin()
      .then((userFromApi) => {
          this.currentUser = userFromApi	
          })
          
          // this.getThemCamels();
      .catch(() => {
          this.routerThang.navigate(['/']);
      });
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

  showEditForm() {
    this.isShowingForm = true;
  } // close showEditForm()


  
}