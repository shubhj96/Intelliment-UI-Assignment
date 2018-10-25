import { Component, OnInit } from '@angular/core';
import {ApiService} from '../service/api.service';
import {UserDataItem, Item} from '../service/users';
import { ActivatedRoute } from '@angular/router';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  item : Item[];
  name : string ='';
  user : UserDataItem[] = [];
  public colors = ['red']
  public  dataColumns = [1];
  showGraph = false;

  constructor(private route: ActivatedRoute, private api : ApiService) {
    this.route.params.subscribe( params => this.name = params.name );
    this.searchUser();
  }

  ngOnInit() {
  }

  /**
   * @ngDoc
   * @name : searchUser
   * @description : this function is used to search the users with the requested names
   */
  public searchUser = function(){
    this.api.getUsers(this.name)
    .subscribe(res => {
      this.items = res.items;
      this.getUserInfo();
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  /**
   * @ngDoc
   * @name : getUserInfo
   * @description : this function is used fetch the user information from api
   */
  public getUserInfo = function (){
    var id = 0;
    this.items.forEach(element => {
      this.getProfileInfo(id, element.login);
      id++;
    });
  }

  /**
   * @ngDoc
   * @name : getProfileInfo
   * @description : this function is used fetch the profile information for the selected user
   *                from api
   */
  public getProfileInfo = function(id, name){
    this.api.getUser(name)
    .subscribe(res => {
      var userData : UserDataItem = {id : id, label : name, value : res.followers};
      this.user.push(userData);
      if(this.user.length == this.items.length){
        this.sortAndSpliceData();
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  /**
   * @ngDoc
   * @name : sortAndSpliceData
   * @description : this function is used to sort the array and splice to the length 10
   */
  public sortAndSpliceData = function (){
    this.user.sort((a, b) => {
      if (a.value < b.value) return -1;
      else if (a.value > b.value) return 1;
      else return 0;
    });
    this.user.splice(10);
    this.showGraph = true;
  }

}
