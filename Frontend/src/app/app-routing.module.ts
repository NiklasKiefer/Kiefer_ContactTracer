import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindeleteComponent } from './admindelete/admindelete.component';
import { AdminaccountComponent } from './components/adminaccount/adminaccount.component';
import { AdmincreateComponent } from './components/admincreate/admincreate.component';
import { AdmineditComponent } from './components/adminedit/adminedit.component';
import { AdminentriesComponent } from './components/adminentries/adminentries.component';
import { CheckinComponent } from './components/checkin/checkin.component';
import { CheckininfoComponent } from './components/checkininfo/checkininfo.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutinfoComponent } from './components/checkoutinfo/checkoutinfo.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: '', component: CheckinComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'checkininfo', component: CheckininfoComponent},
  {path: 'adminentries', component: AdminentriesComponent},
  {path: 'admincreate', component: AdmincreateComponent},
  {path: 'checkoutinfo', component: CheckoutinfoComponent},
  {path: 'adminaccount', component: AdminaccountComponent},
  {path: 'adminedit', component: AdmineditComponent},
  {path: 'admindelete', component: AdmindeleteComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
