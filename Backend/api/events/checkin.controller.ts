import { inject, injectable } from "inversify";
import { controller, httpGet, httpPost, interfaces } from "inversify-express-utils";
import { DatabaseService } from "../../core/services/database.service";
import {Request, Response } from "express";


@controller('/checkin')
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
        let postalcode = request.params.postalcode;
        let city = request.params.city;
        this.databaseService.checkIn(firstname, secondname, company, phonenumber, email, street, postalcode, city).then((result) =>{

            response.json(result);
        })
    }
}