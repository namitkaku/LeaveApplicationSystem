import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { ApiserviceService } from '../../services/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private serviceObject:ApiserviceService,
    private toastr:ToastrService,
    private router:Router) {
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
     email:[''],
     password:['']
    });
  }

  onSubmit()
  {
    this.serviceObject.adminLogin(this.loginForm.value).subscribe(response => {
      if(response['status'] == 200)
      {
        localStorage.setItem('email',response['data']);
        this.router.navigate(['admin/dashboard']);
        this.toastr.success(response['message']);
      }
      else
      {
        this.toastr.error(response['message']);
      }
    });
  }

}
