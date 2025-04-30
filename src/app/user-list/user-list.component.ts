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
      this.webStorageService.getRemote().subscribe(filtered => {
          this.users = (filtered === null) ? this.userListService.getAll() : this.userListService.filter(filtered);
      }, error => {
          console.error('ngOnInit Error', error);
      });
  }

  public async update(text: string): Promise<void> {
      this.webStorageService.setRemote(text).subscribe(filtered => {
          this.users = (filtered === null) ? this.userListService.getAll() : this.userListService.filter(filtered);
      });
  }

}
