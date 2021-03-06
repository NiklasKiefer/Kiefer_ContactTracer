import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { CheckinComponent } from './components/checkin/checkin.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component'
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RegisterComponent } from './components/register/register.component'
import { HttpClientModule } from '@angular/common/http';
import { CheckininfoComponent } from './components/checkininfo/checkininfo.component';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { AdminentriesComponent } from './components/adminentries/adminentries.component';
import { AdmincreateComponent } from './components/admincreate/admincreate.component';
import {MatTableModule} from '@angular/material/table';
import { CheckoutinfoComponent } from './components/checkoutinfo/checkoutinfo.component';
import { AdminaccountComponent, ChangeDialog } from './components/adminaccount/adminaccount.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdmineditComponent } from './components/adminedit/adminedit.component';
import { AdmindeleteComponent } from './admindelete/admindelete.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckinComponent,
    LoginComponent,
    NotfoundComponent,
    CheckoutComponent,
    RegisterComponent,
    CheckininfoComponent,
    AdminentriesComponent,
    AdmincreateComponent,
    CheckoutinfoComponent,
    AdminaccountComponent,
    ChangeDialog,
    AdmineditComponent,
    AdmindeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    QRCodeModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
