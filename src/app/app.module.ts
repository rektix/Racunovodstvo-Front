import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ProfileTestComponent } from './components/profile-test/profile-test.component';
import { AccountPlanComponent } from './components/account-plan/account-plan.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {AddNewClientComponent} from "./components/add-new-client/add-new-client.component";
import {AddNewInvoiceComponent} from "./components/add-new-invoice/add-new-invoice.component";
import {ManageUsersComponent} from "./components/manage-users/manage-users.component";
import {KufComponent} from "./components/kuf/kuf.component";
import {KifComponent} from "./components/kif/kif.component";
import { BrutoBilansComponent } from './components/bruto-bilans/bruto-bilans.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileTestComponent,
    AccountPlanComponent,
    AddNewClientComponent,
    AddNewInvoiceComponent,
    ManageUsersComponent,
    KufComponent,
    KifComponent,
    BrutoBilansComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
