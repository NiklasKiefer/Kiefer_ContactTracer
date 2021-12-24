import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apiConfiguration from '../../../assets/configuration/api-config.json';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { Router} from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private HttpClient: HttpClient, private LoggerService: LoggerService, private router: Router) { }

  ngOnInit(): void {
  }

  public errormsg = "";

  public registerAdmin(firstname: string, lastname: string, username: string, email: string, password: string): void{
    var posturl = apiConfiguration.postregister + firstname + "&" + lastname + "&" + username + "&" + email + "&" + password;
    this.HttpClient
    .post<any>(posturl, {})
    .subscribe({
      next: (response: any) =>{
        if("created" in response){
          if (response.created == true){
            this.router.navigateByUrl('login');
          }
        }
        else{
          if ("alreadyExists" in response){
            this.errormsg = "Username already exists. Try again with another.";
          }
          else{
            this.LoggerService.log("ERROR: API Response message not expected.");
          }
        }
      },
      error: (error) => this.LoggerService.log("Error while http get to api-register."),
      complete: () => this.LoggerService.log("complete")
    });
  }
}
