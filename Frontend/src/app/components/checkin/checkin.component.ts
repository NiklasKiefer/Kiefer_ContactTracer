import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { LoggerService } from '../../services/logger/logger.service';
import apiConfiguration from '../../../assets/configuration/api-config.json';
import { LoginComponent } from '../login/login.component';
import { Router} from '@angular/router'

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})

export class CheckinComponent implements OnInit {
  constructor(private HttpClient: HttpClient, private LoggerService: LoggerService, private router: Router) { }

  ngOnInit(): void {
  }

  public errormsg = "";

  public sendCheckIn(firstname: string, lastname: string, company: string, phonenumber: string, email: string, street: string, postalcode: string, city: string): void{
    const params = {
      firstname: firstname,
      lastname: lastname,
      company: company,
      phonenumber: phonenumber,
      email: email,
      street: street,
      postalcode: postalcode,
      city: city
    };

    if (company == ""){
      company = " ";
    }

    const puturl = apiConfiguration.getcheckin + firstname + "&" + lastname + "&" + company + "&" + phonenumber + "&" + email + "&" + street + "&" + postalcode + "&" + city; 
    console.log(puturl);
    this.HttpClient
        .post<any>(puturl, params)
        .subscribe({
          next: (response: any) =>{
            if("alreadyExists" in response){
              this.errormsg = "Seems like you are already checked-in. Check-out before attempting another check-in."
            }
            else{
              const id = response.id;
              this.router.navigateByUrl('checkininfo', {state: {"id": id}});
            }
          },
          error: (error) => this.LoggerService.log("Error while http get to api-checkin."),
          complete: () => this.LoggerService.log("complete")
        });
  }
}
