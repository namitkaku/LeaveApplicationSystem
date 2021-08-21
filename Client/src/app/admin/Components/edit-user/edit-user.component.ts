import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { ApiserviceService } from '../../services/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  edituserForm:FormGroup;
  userid:String;
  data:any;

  constructor(private formBuilder:FormBuilder,
    private serviceObject:ApiserviceService,
    private toastr:ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.edituserForm = this.formBuilder.group({
      _id:[],
      name:[],
      email:[],
      phone:[],
      password:[],
      gender:[],
      department:[],
      address:[],
      description:[]
    });

    this.userid = this.route.snapshot.paramMap.get('id');
    this.serviceObject.getUserData(this.userid).subscribe(response => {
      console.log(response);
      if(response['status'] == 200)
      {
        this.edituserForm.patchValue({
          _id:response['data'][0]._id,
          name:response['data'][0].name,
          email:response['data'][0].email,
          phone:response['data'][0].phone,
          password:response['data'][0].password,
          gender:response['data'][0].gender,
          department:response['data'][0].department,
          address:response['data'][0].address,
          description:response['data'][0].description
        });
      }
    })
  }

  onSubmit()
  {
    // console.log(this.edituserForm.value);
    this.serviceObject.updateUserInfo(this.edituserForm.value).subscribe(response => {
      if(response['status'] == 200)
      {
        this.toastr.success(response['message']);
      }
      else
      {
        this.toastr.error(response['message']);
      }
    })
  }

}
