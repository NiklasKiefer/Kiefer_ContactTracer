import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger/logger.service';
import apiConfiguration from '../../../assets/configuration/api-config.json';
import { Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private LoggerService: LoggerService, private HttpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  public errormsg = " ";

  public loginAdmin(username: string, password: string): void{
    var geturl = apiConfiguration.login + username + "&" + password;
    this.HttpClient
    .get<any>(geturl, {})
    .subscribe({
      next: (response: any) =>{
        if("Login" in response){
          if (response.Login == true){
            this.LoggerService.log("Login successful.");
            this.router.navigateByUrl('adminentries', {state: {"username": username, "password": password}});
          }
          else{
            this.errormsg = "Username or password incorrect."
            this.LoggerService.log("Username or password incorrect.");
          }
        }
        else{
          this.LoggerService.log("Error: API Response not valid.");
        }
      },
      error: (error) => this.LoggerService.log("Error while http get to api-register."),
      complete: () => this.LoggerService.log("complete")
    });
  }
}
