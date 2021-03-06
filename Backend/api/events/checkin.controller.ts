import { inject, injectable } from "inversify";
import { controller, httpGet, httpPost, httpPut, interfaces } from "inversify-express-utils";
import { DatabaseService } from "../../core/services/database.service";
import {Request, Response } from "express";
import { LoggerService } from "../../core/services/logger.service";


@controller('/v1/checkin')
@injectable()
export class CheckInController implements interfaces.Controller{
    constructor(@inject(DatabaseService.name) private databaseService: DatabaseService) {

    }

    @httpPost('/:firstname&:secondname&:company&:phonenumber&:email&:street&:postalcode&:city')
    public checkin(request: Request, response: Response): void{
        let firstname = request.params.firstname;
        let secondname = request.params.secondname;
        let company = request.params.company;
        let phonenumber = request.params.phonenumber;
        let email = request.params.email;
        let street = request.params.street;
        let postalcode = request.params.postalcode ;
        let city = request.params.city;
        this.databaseService.checkIn(firstname, secondname, company, phonenumber, email, street, postalcode, city).then((result) =>{
            response.status(200).json(result);
        });
    }

    @httpGet('/:username&:password')
    public getAllCheckIns(request: Request, response: Response): void{
        let username = request.params.username;
        let password = request.params.password;
        this.databaseService.getAllCheckIns(username, password).then((result) =>{
            response.status(200).json(result);
        });
    }

    @httpPut('/:username&:password&:checkInID&:firstname&:lastname&:company&:phonenumber&:email&:street&:postalcode&:city')
    public updateCheckIn(request: Request, response: Response): void{
        let username = request.params.username;
        let password = request.params.password;
        let checkInID = request.params.checkInID;
        let firstname = request.params.firstname;
        let lastname = request.params.lastname;
        let company = request.params.company;
        let phonenumber = request.params.phonenumber;
        let email = request.params.email;
        let street = request.params.street;
        let postalcode = request.params.postalcode;
        let city = request.params.city;

        this.databaseService.updateCheckIn(username, password, checkInID, firstname, lastname, company, phonenumber, email, street, postalcode, city).then((result) =>{
            response.status(200).json(result);
        })
    }
}