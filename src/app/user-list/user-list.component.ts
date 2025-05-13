import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserListService } from './user-list.service';

import { WebStorageService } from '../services/web-storage.service';
// i do not understand what is happening in this project , the person is using an mock api server which intercepts every request the doumentation is mostly related to the videos
//here we are creating an local storage to show the name of the users from the filter even when we reload the page  
@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: Promise<User[]> | null = null;

  constructor(
    private userListService: UserListService,
    private webStorageService: WebStorageService // DI of the webstorageservice 
  ) { }

  public async ngOnInit(): Promise<void> {
    // basically for now assume that this getremote function is returning the data that is present in the local storage , so
    // here we are doing nothing but checking if something is present in the local storage and if yes then we return the 
      this.webStorageService.getRemote().subscribe(filtered => {  // whatever is returned by the service is stored in the filter and then
        // here we are checking that if filtered is null , i.e if nothing is returned then we return all the user , otherwise we return the filtered list after applying the filter 
          this.users = (filtered === null) ? this.userListService.getAll() : this.userListService.filter(filtered); 
          // checks if there is an search filter that is stored in the local storage and if not then it show the original list 
      }, error => {
          console.error('ngOnInit Error', error);
      });
  }

  public async update(text: string): Promise<void> {
      this.webStorageService.setRemote(text).subscribe(filtered => { // when the user enters something in the search this is triggered and if the search is null then it shows the original list of users other wise it shows the 
          this.users = (filtered === null) ? this.userListService.getAll() : this.userListService.filter(filtered);
      });
  }

}
