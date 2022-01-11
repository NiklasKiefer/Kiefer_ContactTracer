import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { CheckIn } from 'src/assets/models/checkin.model';
import apiConfiguration from 'src/assets/configuration/api-config.json'

@Component({
  selector: 'app-adminentries',
  templateUrl: './adminentries.component.html',
  styleUrls: ['./adminentries.component.scss']
})
export class AdminentriesComponent implements OnInit {

  private username = "";
  private password = "";
  public checkIns: Array<CheckIn> = new Array<CheckIn>();
  public properties: string[] = ["id", "firstname", "lastname", "company", "phonenumber", "email", "street", "postalcode", "city", "time", "edit", "delete"];

  constructor(private LoggerService: LoggerService, private router: Router, private HttpClient: HttpClient) { }

  ngOnInit(): void {
    this.username = history.state.username;
    this.password = history.state.password;

    if(this.username == undefined && this.password == undefined){
      this.router.navigateByUrl('login');
    }
    else{
      const geturl = apiConfiguration.checkin + this.username +  "&" + this.password;
      this.HttpClient
      .get<Array<CheckIn>>(geturl, {})
      .subscribe({
        next: (response: any) =>{
          if ("validUser" in response){
            if (response.validUser == false){
              this.router.navigateByUrl('login');
            }
          }
          else{
            this.checkIns = response;
          }
        },
        error: (error) => console.log("Error while http get to api-checkin."),
        complete: () => console.log("complete")
      });
    }
  }

  public numberToDate(date: number): string{
    return new Date(date).toLocaleString();
  }

  public addButtonClicked(): void{
    this.router.navigateByUrl('admincreate', {state: {"username": this.username, "password": this.password}});
  }

  public accountButtonClicked(): void{
    this.router.navigateByUrl('adminaccount', {state: {"username": this.username, "password": this.password}});
  }

  public editCheckIn(checkIn: CheckIn): void{
    this.router.navigateByUrl('adminedit', {state: {"username": this.username, "password": this.password, "checkIn": checkIn}});
  }

  public deleteCheckIn(checkIn: CheckIn): void{
    console.log(checkIn);
    this.router.navigateByUrl("admindelete", {state: {"username": this.username, "password": this.password, "checkInID": checkIn.id}});
  }
}
