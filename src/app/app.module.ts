import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SessionService } from './session.service';


import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})

export class AppModule { }
