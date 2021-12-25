import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger/logger.service';
import apiConfiguration from '../../../assets/configuration/api-config.json';

@Component({
  selector: 'app-admincreate',
  templateUrl: './admincreate.component.html',
  styleUrls: ['./admincreate.component.scss']
})
export class AdmincreateComponent implements OnInit {

  constructor(private router: Router, private HttpClient: HttpClient, private LoggerService: LoggerService) { }

  private username = "";
  private password = "";

  public errormsg = "";

  ngOnInit(): void {
    this.username = history.state.username;
    this.password = history.state.password;

    if(this.username == undefined && this.password == undefined){
      this.router.navigateByUrl('login');
    }
  }

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

    const posturl = apiConfiguration.checkin + firstname + "&" + lastname + "&" + company + "&" + phonenumber + "&" + email + "&" + street + "&" + postalcode + "&" + city; 
    this.HttpClient
        .post<any>(posturl, params)
        .subscribe({
          next: (response: any) =>{
            if("alreadyExists" in response){
              this.errormsg = "Seems like this user is already checked-in. Check-out before attempting another check-in."
            }
            else{
              const id = response.id;
              this.router.navigateByUrl('adminentries', {state: {username: this.username, password: this.password}});
            }
          },
          error: (error) => {
            this.LoggerService.log("Error while http get to api-checkin.");
            this.errormsg = "You have to fill out all required fields.";
          },
          complete: () => this.LoggerService.log("complete")
        });
  }

}
