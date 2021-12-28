import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger/logger.service';
import apiConfiguration from 'src/assets/configuration/api-config.json'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-adminedit',
  templateUrl: './adminedit.component.html',
  styleUrls: ['./adminedit.component.scss']
})
export class AdmineditComponent implements OnInit {

  constructor(private router: Router, private HttpClient: HttpClient, private LoggerService: LoggerService, public dialog: MatDialog) { }

  public username = "";
  public password = "";
  public checkIn: any;

  ngOnInit(): void {
    this.username = history.state.username;
    this.password = history.state.password;
    this.checkIn = history.state.checkIn;

    if(this.username == undefined || this.password == undefined || this.checkIn == undefined){
      this.router.navigateByUrl('login');
    }
  }

  public updateCheckIn(username: string, password: string, checkInID: string, firstname: string, lastname: string, company: string, phonenumber: string, email: string, street: string, postalcode: string, city: string): void{
    const puturl = apiConfiguration.update + this.username +  "&" + this.password + "&" + checkInID + "&" + firstname + "&" + lastname + "&" + company + "&" + phonenumber + "&" + email + "&" + street + "&" + postalcode + "&" + city;
    this.HttpClient
      .put(puturl, {})
      .subscribe({
        next: (response: any) =>{
          if ("validUser" in response){
            if (response.validUser == false){
              this.router.navigateByUrl('login');
            }
          }
          else{
            const dialogRef = this.dialog.open(CheckInChangeDialog);
          }
        },
        error: (error) => this.LoggerService.log("Error while http put to update check-in infos."),
        complete: () => this.LoggerService.log("complete")
      });
  }

  public back(): void{
    this.router.navigateByUrl("/adminentries", {state: {"username": this.username, "password": this.password}});
  }

}

@Component({
  selector: 'checkIn-changedialog',
  templateUrl: 'checkIn-changedialog.html',
})
export class CheckInChangeDialog {}