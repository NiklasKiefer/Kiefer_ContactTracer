import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger/logger.service';
import apiConfiguration from 'src/assets/configuration/api-config.json'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-adminaccount',
  templateUrl: './adminaccount.component.html',
  styleUrls: ['./adminaccount.component.scss']
})
export class AdminaccountComponent implements OnInit {

  constructor(private router: Router, private HttpClient: HttpClient, private LoggerService: LoggerService, public dialog: MatDialog) { }
  
  public username = "";
  public password = "";

  public firstname: string = "";
  public lastname: string = "";
  public email: string = "";

  ngOnInit(): void {
    this.username = history.state.username;
    this.password = history.state.password;

    if(this.username == undefined && this.password == undefined){
      this.router.navigateByUrl('/login');
    }
    else{
      const geturl = apiConfiguration.admin + this.username +  "&" + this.password;
      this.HttpClient
      .get(geturl, {})
      .subscribe({
        next: (response: any) =>{
          if ("validUser" in response){
            if (response.validUser == false){
              this.router.navigateByUrl('login');
            }
          }
          else{
            this.firstname = response[0].firstname;
            this.lastname = response[0].lastname;
            this.email = response[0].email;
          }
        },
        error: (error) => this.LoggerService.log("Error while http get to get all admin infos."),
        complete: () => this.LoggerService.log("complete")
      });
    }
  }

  public back(): void{
    this.router.navigateByUrl("/adminentries", {state: {"username": this.username, "password": this.password}});
  }

  public changeAdminData(firstname: string, lastname: string, email: string, newPassword: string){
    const geturl = apiConfiguration.infos + this.username +  "&" + this.password + "&" + firstname + "&" + lastname + "&" + email + "&" + newPassword
      this.HttpClient
      .get(geturl, {})
      .subscribe({
        next: (response: any) =>{
          if ("validUser" in response){
            if (response.validUser == false){
              this.router.navigateByUrl('login');
            }
          }
          else{
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.password = newPassword;

            const dialogRef = this.dialog.open(ChangeDialog);
          }
        },
        error: (error) => this.LoggerService.log("Error while http get to get all admin infos."),
        complete: () => this.LoggerService.log("complete")
      });
  }
}

@Component({
  selector: 'app-changedialog',
  templateUrl: 'app-changedialog.html',
})
export class ChangeDialog {}