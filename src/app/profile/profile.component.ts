import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from '../service/api.service';
import {Item} from '../service/users';
import {Repositories} from '../service/repo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  login : string = '';
  userInfo : Item;
  reposList : Repositories[] = [];

  constructor(private route: ActivatedRoute, private api : ApiService) {
    this.route.params.subscribe( params => this.login = params.login );
    this.getProfileInfo();
   }

  ngOnInit() {
  }

  /**
   * @ngDoc
   * @name : getProfileInfo
   * @description : this function is used fetch the profile information for the selected user
   *                from api
   */
  public getProfileInfo = function(){
    this.api.getUser(this.login)
    .subscribe(res => {
      this.userInfo = res;
      this.isLoadingResults = false;
      this.fetchRepositories();
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  /**
   * @ngDoc
   * @name : fetchRepositories
   * @description : this function is used fetch the repositories list for the selected user
   */
  public fetchRepositories= function (){
    this.api.getRepoList(this.userInfo.repos_url)
    .subscribe(res => {
      this.reposList = res;
      console.log(this.userInfo);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
