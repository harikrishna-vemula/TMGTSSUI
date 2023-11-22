import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { HeaderComponent } from './layout/header/header.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PagenotfoundComponent } from './layout/pagenotfound/pagenotfound.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimaryTenantComponent } from './layout/primary-tenet/primary-tenant.component';
import { HttpClientModule } from '@angular/common/http';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
