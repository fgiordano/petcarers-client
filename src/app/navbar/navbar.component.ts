import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { environment } from '../../environments/environment';

import { SessionService } from '../session.service';
import { EditUserService } from '../edit-user.service';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser = {
  username: ''
  };

  constructor(

  	private authThang: SessionService,
    private editThang: EditUserService,
    private petThang: PetService,
    private route: ActivatedRoute,
    private routerThang: Router

    ) { }

  ngOnInit() { 
	    this.authThang.checklogin()
	      .then((userFromApi) => {
	          this.currentUser = userFromApi	
	          })

	      .catch(() => {
	          this.routerThang.navigate(['/']);
	      });

  } // close ngOnInit()
}
