import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger/logger.service';

@Component({
  selector: 'app-adminentries',
  templateUrl: './adminentries.component.html',
  styleUrls: ['./adminentries.component.scss']
})
export class AdminentriesComponent implements OnInit {

  constructor(private LoggerService: LoggerService, private router: Router) { }

  private username = "";
  private password = "";

  ngOnInit(): void {
    this.username = history.state.username;
    this.password = history.state.password;

    if(this.username == undefined && this.password == undefined){
      this.router.navigateByUrl('/');
    }

    this.LoggerService.log(this.username + " " + this.password);
  }

}
