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

    @httpPost('/register/:firstname&:lastname&:email&:username&:password')
    public registerAdmin(request: Request, response: Response): void{
        this.databaseService.registerAdmin(request.params.firstname, request.params.lastname, request.params.email, request.params.username, request.params.password).then((result) =>{    
            this.loggerService.info("Sending result from database service to client.");
            response.status(200).json(result);
        })
    }

    @httpGet('/login/:username&:password')
    public loginAdmin(request: Request, response: Response): void{
        this.loggerService.info("User " + request.params.username + " tries to login");
        this.databaseService.loginAdmin(request.params.username, request.params.password).then((result) =>{
            response.status(200).json(result);
        })
    }

    @httpGet('/:username&:password')
    public getAccountInfos(request: Request, response: Response): void{
        this.loggerService.info("User " + request.params.username + " requests admin information.");
        this.databaseService.getAdminInfos(request.params.username, request.params.password).then((result) =>{
            response.status(200).json(result);
        });
    }

    @httpPost('/infos/:username&:password&:firstname&:lastname&:email&:newPassword')
    public changeAccountInfo(request: Request, response: Response): void{
        this.loggerService.info("User " + request.params.username + " requests a change of his information.");
        this.databaseService.changeAdminInfo(request.params.username, request.params.password, request.params.firstname, request.params.lastname, request.params.email, request.params.newPassword).then((result) =>{
            response.status(200).json(result);
        })
    }
}