import { inject, injectable } from "inversify";
import { controller, httpGet, interfaces } from "inversify-express-utils";
import { DatabaseService } from "../../core/services/database.service";
import { CheckIn } from "../../models/checkin.model";
import {Request, Response } from "express";


@controller('/checkins')
@injectable()
export class CheckInController implements interfaces.Controller{
    constructor(@inject(DatabaseService.name) private databaseService: DatabaseService) {

    }

    @httpGet('/')
    public getCheckins(request: Request, response: Response): void{
        this.databaseService.getAllCheckIns().then((result) =>{
            response.json(result);
        })
    }
}