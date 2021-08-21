import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../services/apiservice.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  data:any;
  constructor(private serviceObject:ApiserviceService,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.serviceObject.getAllUsers().subscribe(response => {
      // console.log(response);
      this.data = response['data'];  
    })
  }
  deactivateUser(id:any)
  { 
    this.serviceObject.deactivateUserService(id).subscribe(response => {
      // console.log(response);
      if(response['status'] == 200)
      {
        this.toastr.success(response['message']);
        this.ngOnInit();
      }
      else
      {
        this.toastr.error(response['message']);
      }
    })
  }
  activateUser(id:any)
  { 
    this.serviceObject.activateUserService(id).subscribe(response => {
      // console.log(response);
      if(response['status'] == 200)
      {
        this.toastr.success(response['message']);
        this.ngOnInit();
      }
      else
      {
        this.toastr.error(response['message']);
      }
    })
  }
  deleteUser(id:any)
  {
    var c = confirm("Are you sure you want to Delete this User ?");
    if(c)
    {
      this.serviceObject.deleteUserService(id).subscribe(response => {
        if(response['status'] == 200)
        {
          this.toastr.success(response['message']);
          this.ngOnInit();
        }
        else
        {
          this.toastr.error(response['message']);
        }
      })
    }
    else
    {
      return false;
    }
  }
}
