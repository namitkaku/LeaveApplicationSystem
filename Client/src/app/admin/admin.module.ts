import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './Components/layout/layout.component';
import { HeaderComponent } from './Components/header/header.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AddRoleComponent } from './Components/add-role/add-role.component';
import { ListRolesComponent } from './Components/list-roles/list-roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { ListUsersComponent } from './Components/list-users/list-users.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    FooterComponent,
    AddRoleComponent,
    ListRolesComponent,
    LoginComponent,
    AddUserComponent,
    ListUsersComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
