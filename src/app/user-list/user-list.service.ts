import { Injectable } from '@angular/core';
import { USERS } from '../mocks/users';
import { User } from '../user/user'; // we are importing the user const which has all the data in it 

@Injectable({
    providedIn: 'root'
})
export class UserListService {

    public async getAll(): Promise<User[]> { // this is the user service which is going to return the users from the users data file in the project 
        return USERS;
    }

    public async filter(text: string): Promise<User[]> {
        return USERS.filter(user => user.name.toLowerCase().includes(text.toLowerCase())); // here the filter is an js function which will return an list 
        // from the 
    }
}
