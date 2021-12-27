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

  ngOnInit(): void {
  }

  public checkOutClicked(id: string): void{
    const posturl = apiConfiguration.checkout + id;
        this.HttpClient
        .post<any>(posturl, {})
        .subscribe({
          next: (response: any) =>{
            if("alreadyExists" in response){
              this.errormsg = "Seems like you are already checked-in. Check-out before attempting another check-in."
            }
            else{
              const id = response.id;
              this.router.navigateByUrl('checkininfo', {state: {"id": id}});
            }
          },
          error: (error) => this.LoggerService.log("Error while http get to api-checkin."),
          complete: () => this.LoggerService.log("complete")
        });
  }
}
