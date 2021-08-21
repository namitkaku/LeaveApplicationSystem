import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ListRolesComponent } from './Components/list-roles/list-roles.component';
import { AddRoleComponent } from './Components/add-role/add-role.component';
import { ActivateGuard } from './guards/activate.guard';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { ListUsersComponent } from './Components/list-users/list-users.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'admin',
    component:LayoutComponent,
    canActivate:[ActivateGuard],
    children:[
      {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[ActivateGuard]
      },
      {
        path:'list-roles',
        component:ListRolesComponent,
        canActivate:[ActivateGuard]
      },
      {
        path:'add-role',
        component:AddRoleComponent,
        canActivate:[ActivateGuard]
      },
      {
        path:'add-user',
        component:AddUserComponent,
        canActivate:[ActivateGuard]
      },
      {
        path:'list-user',
        component:ListUsersComponent,
        canActivate:[ActivateGuard]
      },
      {
        path:'edit-user/:id',
        component:EditUserComponent,
        canActivate:[ActivateGuard]
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
