import { Component, ViewEncapsulation } from '@angular/core';
import { LoggerService } from './services/logger/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Contact Tracer';

  constructor(protected loggerService: LoggerService){
    this.loggerService.log('APP Component Init');
  }
}


