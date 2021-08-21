import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  public baseURL = 'http://localhost:3001/api';

  constructor(private http:HttpClient) { }

  adminLogin(requestData:any)
  {
    return this.http.post(this.baseURL + '/admin-login',requestData);
  }
  addUser(requestData:any)
  {
    return this.http.post(this.baseURL + '/add-user' ,requestData);
  }
  getAllUsers()
  {
    return this.http.get(this.baseURL + '/get-all-users');
  }
  deactivateUserService(id:any)
  {
    return this.http.get(this.baseURL + '/deactivate-user/' + id);
  }
  activateUserService(id:any)
  {
    return this.http.get(this.baseURL + '/activate-user/' + id);
  }
  getUserData(userid:any)
  {
    return this.http.get(this.baseURL + '/get-user-data/' + userid);
  }
  updateUserInfo(requestData:any)
  {
    return this.http.post(this.baseURL + '/update-user-info',requestData);
  }
  deleteUserService(id:any)
  {
    return this.http.get(this.baseURL + '/delete-user/' + id);
  }
}
