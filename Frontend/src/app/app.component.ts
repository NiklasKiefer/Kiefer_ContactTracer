import { Component } from '@angular/core';
import { LoggerService } from './services/logger/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Frontend';

  constructor(protected loggerService: LoggerService){
    this.loggerService.log('APP Component Init');
  }
}
