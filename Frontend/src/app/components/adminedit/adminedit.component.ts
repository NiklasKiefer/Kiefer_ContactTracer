import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { CheckIn } from 'src/assets/models/checkin.model';

@Component({
  selector: 'app-adminedit',
  templateUrl: './adminedit.component.html',
  styleUrls: ['./adminedit.component.scss']
})
export class AdmineditComponent implements OnInit {

  constructor(private router: Router, private HttpClient: HttpClient, private LoggerService: LoggerService) { }

  private username = "";
  private password = "";
  public checkIn: any;

  ngOnInit(): void {
    this.username = history.state.username;
    this.password = history.state.password;
    this.checkIn = history.state.checkIn;

    if(this.username == undefined || this.password == undefined || this.checkIn == undefined){
      this.router.navigateByUrl('login');
    }
  }

  public back(): void{
    this.router.navigateByUrl("/adminentries", {state: {"username": this.username, "password": this.password}});
  }

}
