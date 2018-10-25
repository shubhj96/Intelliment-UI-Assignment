import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from '../service/api.service';
import {Users, Item} from '../service/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name : string = '';
  data : Users = {};
  items : Item[];
  constructor(private api : ApiService, public router : Router) {
    this.items = [];
   }

  ngOnInit() {
  }

  /**
   * @ngDoc
   * @name : search
   * @description : this function is used to search the users with the requested names
   */
  public search = function(){
    this.api.getUsers(this.name)
    .subscribe(res => {
      this.data = res;
      this.items = this.data.items;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  /**
   * @ngDoc
   * @name : showProfile
   * @description : this function is used to redirect to profile component to show the
   *                selected user profile
   */
  public showProfile = function (login){
    this.router.navigate(['profile', login]);
  }

  /**
   * @ngDoc
   * @name : showFollowers
   * @description : this function is used to navigate to followers component to show the
   *                folllowers graph
   */
  public showFollowers = function(){
    this.router.navigate(['followers', this.name]);
  }

}
