import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { PetService } from './pet.service';
import { SessionService } from './session.service';
import { EditUserService } from './edit-user.service';
import { ReviewService } from './review.service';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { OtherUserProfileComponent } from './other-user-profile/other-user-profile.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomePageComponent,
    UserProfileComponent,
    EditProfileComponent,
    OtherUserProfileComponent,
    EditPetComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [SessionService,
              EditUserService,
              PetService,
              ReviewService],
  bootstrap: [AppComponent]
})

export class AppModule { }
