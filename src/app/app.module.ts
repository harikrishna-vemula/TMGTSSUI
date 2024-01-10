import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/shared/material/material.module';
import { HeaderComponent } from './layout/header/HeaderComponent';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PagenotfoundComponent } from './layout/pagenotfound/pagenotfound.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimaryTenantComponent } from './layout/primary-tenet/primary-tenant.component';
import { Tanant4Component } from './layout/primary-tenet/tenant4/tenant4.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { UserRoleComponent } from './users/userroles/userroles.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgGridModule } from 'ag-grid-angular';
import { EditUserComponent } from './users/edit-users/edit-users.component';
import { DatePipe } from '@angular/common';
import { ActionRendererComponent } from './users/action-renderer/action-renderer.component';
import { CoversheetComponent } from './layout/primary-tenet/coversheet/coversheet.component';
import { ButtonRendererComponent as UsersButtonRendererComponent } from './users/button-renderer.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { UsersService } from './users/users.service';
import { ScoresheetComponent } from './scoresheet/scoresheet.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Import MatNativeDateModule
import { CosignerComponent } from './layout/primary-tenet/cosigner/cosigner.component';



// import { NavMenuComponent } from './nav-menu/nav-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    PagenotfoundComponent,
    LoginComponent,
    RegisterComponent,
    PrimaryTenantComponent,
    UsersComponent,
    UserRoleComponent,
    EditUserComponent,
    ActionRendererComponent,
    CoversheetComponent,
    UsersButtonRendererComponent,
    AddUsersComponent,
    ScoresheetComponent,
    CosignerComponent,
    Tanant4Component,
    // NavMenuComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AgGridModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DatePipe,UsersService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

  bootstrap: [AppComponent]
})
export class AppModule { }
