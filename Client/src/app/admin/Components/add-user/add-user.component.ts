import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { ApiserviceService } from '../../services/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  usersForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private serviceObject:ApiserviceService,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.usersForm = this.formBuilder.group({
      name:[],
      email:[],
      phone:[],
      password:[],
      gender:[],
      department:[],
      address:[],
      description:[]
    });
  }

  onSubmit()
  {
    // console.log(this.usersForm.value);
    this.serviceObject.addUser(this.usersForm.value).subscribe(response => {
      console.log(response);
      if(response['status'] == 300)
      {
        this.toastr.error(response['message']);
      }
      else
      {
        this.toastr.success(response['message']);
      }
    })
  }

}
