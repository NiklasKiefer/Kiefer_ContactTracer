import { inject, injectable } from "inversify";
import { LoggerService } from "./logger.service";
import { Connection, r, RConnectionOptions, RDatum } from 'rethinkdb-ts';
import * as databaseConfiguration from '../../configuration/db-config.json';
import { CheckIn } from "../../models/checkin.model";
import { Admin } from "../../models/admin.model";
import { AdminsController } from "../../api/events/admin.controller";


@injectable()
export class DatabaseService{
    constructor(@inject(LoggerService.name) private loggerService: LoggerService){

    }

    public initialize(): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.connect().then((connection: Connection) =>{
                r.dbList()
                .contains(databaseConfiguration.databaseName)
                .do((containsDatabase: RDatum<boolean>) =>{
                    return r.branch(containsDatabase, {created: 0}, r.dbCreate(databaseConfiguration.databaseName));
                }).run(connection)
                  .then(() =>{
                       this.loggerService.info("Trying to create tables");
                       this.createTables(connection)
                        .then(() =>{
                            this.loggerService.info("Tables created");
                            resolve(true);
                        })
                        .catch((error) =>{
                            this.loggerService.error(error, "Error while creating tables");
                            reject(false);
                        });
                   }).catch((error) => {
                       reject(false);
                       this.loggerService.error(error, "Error after creating database.");
                   });
            });
        });
    }

    public checkIn(firstname: string, secondname: string, company: string, phonenumber: string, email: string, street: string, postalcode: string, city: string): Promise<any>{
        this.loggerService.info("Saving new checkin: " + firstname + " " + secondname + " " + company + " " + phonenumber + " " + email + " " + street + " " + postalcode + " " + city);
        return new Promise((resolve, reject) =>{
            this.connect().then((connection: Connection) =>{
                r.db(databaseConfiguration.databaseName)
                 .table('checkins')
                 .filter(
                     {
                         firstname: firstname, 
                         secondname: secondname,
                         company: company,
                         phonenumber: phonenumber,
                         email: email,
                         street: street,
                         postalcode: postalcode,
                         city: city
                     })
                  .isEmpty()
                  .do((empty) => r.branch(
                      empty,
                      r.db(databaseConfiguration.databaseName).table('checkins').insert({
                        firstname: firstname, 
                        secondname: secondname,
                        company: company,
                        phonenumber: phonenumber,
                        email: email,
                        street: street,
                        postalcode: postalcode,
                        city: city,
                        time: Date.now()
                      }),
                      {alreadyExists: true}
                  )).run(connection)
                  .then((response) =>{
                    this.loggerService.info("Responding to client after attempted checkin.");
                    if ("alreadyExists" in response){
                        resolve(response);
                    }
                    else{
                        let id = response.generated_keys;
                        resolve({"id": id});
                    }
                  }).catch((error) => { 
                    this.loggerService.error(error, "Error while saving new checkin.");
                    reject(error);
                });
            });
        });
    }

    public registerAdmin(username: string, password: string): Promise<any>{
        this.loggerService.info("Starting to register new admin with username " + username + " and password " + password);
        return new Promise((resolve, reject) =>{
            this.connect().then((connection: Connection) =>{
                r.db(databaseConfiguration.databaseName)
                 .table('admins')
                 .filter({username: username})
                 .isEmpty()
                 .do((empty)=> r.branch(
                     empty,
                     r.db(databaseConfiguration.databaseName).table('admins').insert({
                         username: username,
                         password: password
                     }),
                     {exists: true}
                 )).run(connection)
                 .then((response) =>{
                     this.loggerService.info("Responding to client after new registration.");
                     //Returns false if data already exists.
                     if("exists" in response){
                         resolve({created: false});
                     }
                     //Returns true if data has not existed until now.
                     else{
                         resolve({created: true});
                     }
                 }).catch((error) => { 
                     this.loggerService.error(error, "Error while saving new admin account.");
                     reject(error);
                 });
            });
        });
    }

    public loginAdmin(username: string, password: string): Promise<any>{
        this.loggerService.info("Trying to login user");
        return new Promise((resolve, reject) =>{
            this.connect().then((connection: Connection) =>{
                r.db(databaseConfiguration.databaseName)
                 .table("admins")
                 .filter({username: username, password: password})
                 .count()
                 .eq(1)
                 .do((exists) => r.branch(
                     exists,
                     {Login: true},
                     {Login: false}
                 )).run(connection)
                 .then((response) =>{
                    this.loggerService.info("Responding login status to client.");
                    resolve(response);
                 })
            });
        });
    }

    private createTables(connection: Connection):Promise<boolean>{
        return new Promise((resolve, reject) =>{
            const promises = new Array<Promise<boolean>>();
            databaseConfiguration.databaseTables.forEach((table) =>{
                promises.push(this.createTable(connection, table));
            });
            Promise.all(promises).then(() =>{
                resolve(true);
            }).catch((error) => {
                this.loggerService.error(error, "Error in createTables");
                reject(false);
            });
        });
    }

    private createTable(connection:Connection, tableName: string): Promise<boolean>{
        return new Promise((resolve, reject) =>{
            r.db(databaseConfiguration.databaseName)
            .tableList()
            .contains(tableName)
            .do((containsTable: RDatum<boolean>) =>{
                return r.branch(
                    containsTable, 
                    {create: 0}, 
                    r.db(databaseConfiguration.databaseName).tableCreate(tableName));
            }).run(connection)
            .then(() =>{
                resolve(true);
            }).catch((error) =>{
                this.loggerService.error(error, "Error in createTable");
                reject(false);
            });
        });
    }

    private connect():Promise<Connection>{
        const rethinkDbOptions: RConnectionOptions ={
            host: databaseConfiguration.databaseServer,
            port: databaseConfiguration.databasePort
        }
        return new Promise((resolve, reject) =>{
            r.connect(rethinkDbOptions).then((connection: Connection) =>{
                resolve(connection);
            }).catch(reject);
        });
    }
}