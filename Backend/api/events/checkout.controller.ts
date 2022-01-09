import { inject, injectable } from "inversify";
import { controller, httpGet, httpPost, interfaces } from "inversify-express-utils";
import { DatabaseService } from "../../core/services/database.service";
import {Request, Response } from "express";
import { CheckIn } from "../../models/checkin.model";


@controller('/checkout')
@injectable()
export class CheckOutController implements interfaces.Controller{
    constructor(@inject(DatabaseService.name) private databaseService: DatabaseService) {

    }

    @httpPost('/:id')
    public checkOut(request: Request, response: Response): void{
        let id = request.params.id;
        this.databaseService.getCheckInByID(id).then((result) =>{
            if ("exists" in result){
                console.log("Responding to client, that there was no entry with this id.")
                response.status(200).json(result);
            }
            else{
                let entry: CheckIn = result[0];
                this.databaseService.deleteCheckIn(entry.id).then((result) =>{
                    console.log("deleted checkin with id " + entry.id);
                    this.databaseService.createCheckOut(entry.id, entry.firstname, entry.lastname, entry.company, entry.phonenumber, entry.email, entry.street, entry.postalcode, entry.street, entry.time).then((result) =>{
                        console.log("Responding to client, that the check-out was successful.");
                        response.status(200).json(result);
                    });
                });
            }
        });
    }
}