import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'

@Component({
  selector: 'app-checkoutinfo',
  templateUrl: './checkoutinfo.component.html',
  styleUrls: ['./checkoutinfo.component.scss']
})
export class CheckoutinfoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    const id = history.state.id;
    if (id == undefined){
      this.router.navigateByUrl("/");
    }
  }

}
