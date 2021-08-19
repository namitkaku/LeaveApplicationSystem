import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardserviceService } from '../services/guardservice.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements CanActivate {

  constructor(private userServiceObject:GuardserviceService,
    private router:Router,
    private toastr:ToastrService){}

  canActivate(): boolean {
    if(this.userServiceObject.checkLogin())
    {
      return true;
    }
    else
    {
      this.toastr.warning("You dont have permission to acces this page.Please login first");
      this.router.navigate(['/']);
    }
  }
}
