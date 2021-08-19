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
}
