import { Component } from '@angular/core';
import { UserObjType } from '../type/type-interfaces';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  userData: null | UserObjType;
  constructor(){
    this.userData = null;
    let tempData = localStorage.getItem('userData');
    if(tempData) this.userData = JSON.parse(tempData);
  }
}
