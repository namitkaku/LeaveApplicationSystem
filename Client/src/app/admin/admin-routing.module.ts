import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ListRolesComponent } from './Components/list-roles/list-roles.component';
import { AddRoleComponent } from './Components/add-role/add-role.component';
import { ActivateGuard } from './guards/activate.guard';

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
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
