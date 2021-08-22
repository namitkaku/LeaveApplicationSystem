import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { ApiserviceService } from '../../services/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm:FormGroup;
  email:any;

  constructor(private formBuilder:FormBuilder,
    private serviceObject:ApiserviceService,
    private toastr:ToastrService,) { }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.changePasswordForm = this.formBuilder.group({
      current_password:[],
      new_password:[],
      confirm_password:[],
      email:[this.email]
    });
  }

  onSubmit()
  {
    this.serviceObject.changePassword(this.changePasswordForm.value).subscribe(response => {
      if(response['status'] == 200)
      {
        this.toastr.success(response['message']);
      }
      else
      {
        this.toastr.error(response['message']);
      }
    })
    console.log(this.changePasswordForm.value);
  }

}
