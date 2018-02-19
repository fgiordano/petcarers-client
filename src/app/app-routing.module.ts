import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OtherUserProfileComponent } from './other-user-profile/other-user-profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'user',
    component: UserProfileComponent
  },
  {
    path: 'user/:id',
    component: OtherUserProfileComponent
  },
  {
    path: 'editpet/:id',
    component: EditPetComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'coming-soon',
    component: ComingSoonComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }