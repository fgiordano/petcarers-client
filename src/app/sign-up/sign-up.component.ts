import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

isLoggedOut: boolean = false;

  signUpInfo = {
    username: '',
    email: '',
    password: ''
  };

  errorMessage: string;

  loginInfo = {
    email: '',
    password: ''
  };

  loginErrorMessage: string;


  constructor(
    private authThang: SessionService,
    private routerThang: Router
  ) { }

  ngOnInit() {
    this.authThang.checklogin()
      // If success, we are logged in.
      .then((resultFromApi) => {
          this.routerThang.navigate(['/signup']);
      })

      // Even if you don't do anything on error, catch to avoid a console error.
      .catch((err) => {
          this.isLoggedOut = true;
      });
  }

  doSignUp() {
    this.authThang.signup(this.signUpInfo)
      .then((resultFromApi) => {
          // clear form
          this.signUpInfo = {
            username: '',
            email: '',
            password: ''
          };

          // clear error message
          this.errorMessage = "";

          // redirect to /camels
          this.routerThang.navigate(['/signup']);
      })
      .catch((err) => {
          const parsedError = err.json();
          this.errorMessage = parsedError.message + ' 😤';
      });
  } // close doSignUp()

  doLogin() {
    this.authThang.login(this.loginInfo)
      .then((resultFromApi) => {
          // clear the form
          this.loginInfo = {
            email: '',
            password: ''
          };

          // clear the error message
          this.loginErrorMessage = "";

          // redirect to /camels
          this.routerThang.navigate(['/signup']);
      })
      .catch((err) => {
          const parsedError = err.json();
          this.loginErrorMessage = parsedError.message + ' 😤';
      });
  } // close doLogin()

}









//  formInfo = {
//   	username: '',
//   	password: ''
//   };

//   user: any;
//   error: string;
//   privateData: any = '';

//   constructor(private session: SessionService) { }

//   ngOnInit() {
//   	this.session.isLoggedIn()
//   	.subscribe(
//   		(user) => this.successCb(user)
//   		);
//   }

//   login() {
//   	this.session.login(this.formInfo)
//   	.subscribe(
//         (user) => this.successCb(user),
//         (err) => this.errorCb(err)
//   		);
//   }

//   signup() {
//   	this.session.signup(this.formInfo)
//   	.subscribe(
//         (user) => this.successCb(user),
//         (err) => this.errorCb(err)
//   		);
//   }

//   logout() {
//     this.session.logout()
//       .subscribe(
//         () => this.successCb(null),
//         (err) => this.errorCb(err)
//       );
//   }

//   getPrivateData() {
//   	this.session.getPrivateData()
//   	.subscribe(
//   		(data) => this.privateData = data,
//   		(err) => this.error = err
//   		);
//   }

//   errorCb(err) {
//     this.error = err;
//     this.user = null;
//   }

//   successCb(user) {
//     this.user = user;
//     this.error = null;
//   }

// }

