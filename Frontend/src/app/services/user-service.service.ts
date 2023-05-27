import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

constructor() { }

  addUser(user: User)
  {
    let users: User[];
    let usersString = localStorage.getItem('Users');
    console.log(usersString); // see what you get here
    if(localStorage.getItem('Users'))
    {
      users = JSON.parse(localStorage.getItem('Users') as string);
      users = [user, ...users];
      // users=[user,... Object.values(users)];
    }
    else
    {
      users = [user];
    }
    console.log(usersString); // see what you get here
    localStorage.setItem('Users',JSON.stringify(users.values));
  }

// It happen in angular 12 or above becuase of strict type checking
// enabled by default in these version. As json.parse expect string but localstorage.getitem
// can return either string or null is the reason for this error
}
