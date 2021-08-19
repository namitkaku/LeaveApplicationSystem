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


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    FooterComponent,
    AddRoleComponent,
    ListRolesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
