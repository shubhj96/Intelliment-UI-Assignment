import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, public router : Router) {
    auth.handleAuthentication();
  }

  ngOnInit() {
  }

  /**
   * @ngDoc
   * @name : navigateHome
   * @description : this function is used to navigate to home page after successfull login
   */
  public navigateHome = function (){
    this.router.navigate(['home']);
  }

}
