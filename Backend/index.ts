import { IoContainer } from './core/ioc/ioc.container';
import { LoggerService } from './core/services/logger.service';
import * as express from 'express';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { DatabaseService } from './core/services/database.service';

const container = new IoContainer();
container.init();

const logger = container.getContainer().resolve(LoggerService);
const databaseService = container.getContainer().resolve(DatabaseService);

const server = new InversifyExpressServer(container.getContainer());

databaseService.initialize().then(() =>{
    const app = server.build();
    app.listen(9999);
    logger.info("Server listening on port 9999");
}).catch(() =>{
    logger.error("Error while starting express server");
})