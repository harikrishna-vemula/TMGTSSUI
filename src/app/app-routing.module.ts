import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/HeaderComponent';
import { PagenotfoundComponent } from './layout/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';

import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { PrimaryTenantComponent } from './layout/primary-tenet/primary-tenant.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoleComponent } from './users/userroles/userroles.component';
import { EditUserComponent } from './users/edit-users/edit-users.component';
import { CoversheetComponent } from './layout/primary-tenet/coversheet/coversheet.component';
import { AddUsersComponent } from './users/add-users/add-users.component';

import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { ScoresheetComponent } from './scoresheet/scoresheet.component';

const routes: Routes = [
  { path: '', redirectTo: 'primarytenant', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },
  { path: 'dashboard', component: DashboardComponent },
 
  { path: 'footer', component: FooterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'primarytenant', component: PrimaryTenantComponent },
  { path: 'primarytenant/:id', component: PrimaryTenantComponent },
  { path: 'users', component: UsersComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'userroles', component: UserRoleComponent },
  { path: 'editusers', component: EditUserComponent },
  { path: 'editusers/:id', component: EditUserComponent },
  { path: 'coversheet', component: CoversheetComponent },
  { path: 'coversheet/:id', component: CoversheetComponent },
  { path: 'scoresheet', component: ScoresheetComponent },
  { path: 'addusers', component: AddUsersComponent ,
  // {path: 'editusers/:id', component: EditUserComponent,
  
  // data: {
  //   roles: ['Admin','Editor','Reader']
  // }
},

  { path: '**', component: PagenotfoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
