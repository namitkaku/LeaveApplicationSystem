import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardserviceService {

  constructor() { }

  public checkLogin():boolean{
    const token = localStorage.getItem('email');

    if(token)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
