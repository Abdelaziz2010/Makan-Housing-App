import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user: any)
  {
    let currentUser = {};

    if(localStorage.getItem('Users'))
    {
      currentUser = JSON.parse(localStorage.getItem('Users') as string);
    }
    return user;
  }

}
