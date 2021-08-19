import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ListRolesComponent } from './Components/list-roles/list-roles.component';
import { AddRoleComponent } from './Components/add-role/add-role.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'admin',
    component:LayoutComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'list-roles',
        component:ListRolesComponent
      },
      {
        path:'add-role',
        component:AddRoleComponent
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
