import { Component, OnInit } from '@angular/core';
import apiConfiguration from '../../../assets/configuration/api-config.json';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router'
import { LoggerService } from 'src/app/services/logger/logger.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private HttpClient: HttpClient, private router: Router, private LoggerService: LoggerService) { }

  errormsg: string = "";
  id: string = "";

  ngOnInit(): void {

  }
  
  public checkOutClicked(id: string): void{
    const posturl = apiConfiguration.checkout + id;
        this.HttpClient
        .post<any>(posturl, {})
        .subscribe({
          next: (response: any) =>{
            if("exists" in response){
              this.errormsg = "There was no check-in found with this id. Enter again.";
            }
            else{
              this.router.navigateByUrl('checkoutinfo', {state: {"id": id}});
            }
          },
          error: (error) => this.LoggerService.log("Error while http get to api-checkin."),
          complete: () => this.LoggerService.log("complete")
        });
  }
}
