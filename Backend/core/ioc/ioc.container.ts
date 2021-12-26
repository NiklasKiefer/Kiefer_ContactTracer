import 'reflect-metadata';
import { Container } from 'inversify';
import { interfaces, TYPE } from 'inversify-express-utils';
import { LoggerService } from '../services/logger.service';
import { DatabaseService } from '../services/database.service';
import { CheckInController } from '../../api/events/checkin.controller';
import { AdminsController } from '../../api/events/admin.controller';
import { CheckOutController } from '../../api/events/checkout.controller';

export class IoContainer {
  private container = new Container();

  public init(): void {
    this.initServices();
    this.initController();
  }

  public getContainer(): Container {
    return this.container;
  }

  private initController(): void {
    this.container.bind<interfaces.Controller>(TYPE.Controller)
    .to(CheckInController)
    .whenTargetNamed(CheckInController.name);

    this.container.bind<interfaces.Controller>(TYPE.Controller)
    .to(AdminsController)
    .whenTargetNamed(AdminsController.name);

    this.container.bind<interfaces.Controller>(TYPE.Controller)
    .to(CheckOutController)
    .whenTargetNamed(CheckOutController.name);
  }

  private initServices(): void {
    this.container
      .bind<LoggerService>(LoggerService.name)
      .to(LoggerService)
      .inSingletonScope();
      this.container
      .bind<DatabaseService>(DatabaseService.name)
      .to(DatabaseService)
      .inSingletonScope();
  }
}
