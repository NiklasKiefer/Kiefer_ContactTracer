import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import apiConfiguration from '../../assets/configuration/api-config.json';

@Component({
  selector: 'app-admindelete',
  templateUrl: './admindelete.component.html',
  styleUrls: ['./admindelete.component.scss']
})
export class AdmindeleteComponent implements OnInit {

  constructor(private HttpClient: HttpClient, private router: Router) { }

  public username = "";
  public password = "";
  public checkInID = "";

  ngOnInit(): void {
    this.username = history.state.username;
    this.password = history.state.password;
    this.checkInID = history.state.checkInID;

    if(this.username == undefined && this.password == undefined){
      this.router.navigateByUrl('/login');
    }
    else{
      console.log(this.checkInID);
    }
  }

  public checkOutClicked(checkInID: string): void{
    const posturl = apiConfiguration.checkout + checkInID;
        this.HttpClient
        .post<any>(posturl, {})
        .subscribe({
          next: (response: any) =>{
            if("exists" in response){
              console.log("There was no check-in found with this id. Enter again.");
            }
            this.router.navigateByUrl("adminentries", {state: {"username": this.username, "password": this.password}});
          },
          error: (error) => console.log("Error while http get to api-checkin."),
          complete: () => console.log("complete")
        });
  }

  public backClicked(): void{
    this.router.navigateByUrl("adminentries", {state: {"username": this.username, "password": this.password}});
  }
}
