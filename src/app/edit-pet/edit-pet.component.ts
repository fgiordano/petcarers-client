import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
	petInfo:any = {};
	saveError: string;



  constructor() { }

  ngOnInit() {
  }

  updatePet(){
  	console.log("Im not a real method");
  }

}
