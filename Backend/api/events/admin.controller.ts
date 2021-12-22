import { inject, injectable } from "inversify";
import { controller, httpGet, httpPost, interfaces, requestParam } from "inversify-express-utils";
import { DatabaseService } from "../../core/services/database.service";
import {Request, Response } from "express";
import { LoggerService } from "../../core/services/logger.service";


@controller('/admins')
@injectable()
export class AdminsController implements interfaces.Controller{
    constructor(@inject(DatabaseService.name) private databaseService: DatabaseService, @inject(LoggerService.name) private loggerService: LoggerService) {

    }

    @httpPost('/register/:username&:password')
    public registerAdmin(request: Request, response: Response): void{
        this.databaseService.registerAdmin(request.params.username, request.params.password).then((result) =>{    
            this.loggerService.info("Sending result from database service to client.");
            response.json(result);
        })
    }

    @httpGet('/login/:username&:password')
    public loginAdmin(request: Request, response: Response): void{
        this.loggerService.info("User " + request.params.username + " tries to login");
        this.databaseService.loginAdmin(request.params.username, request.params.password).then((result) =>{
            response.json(result);
        })
    }
}