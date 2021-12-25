import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'

@Component({
  selector: 'app-checkininfo',
  templateUrl: './checkininfo.component.html',
  styleUrls: ['./checkininfo.component.scss']
})

export class CheckininfoComponent implements OnInit {

  constructor(private router: Router) { }

  public id = " ";

  ngOnInit(): void {  
    this.id = history.state.id;
    
    if (this.id == undefined){
      this.router.navigateByUrl('/');
    }
  }
}
