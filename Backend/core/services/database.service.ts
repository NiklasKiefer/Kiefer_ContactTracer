import { inject, injectable } from "inversify";
import { LoggerService } from "./logger.service";
import { Connection, r, RConnectionOptions, RDatum } from 'rethinkdb-ts';
import * as databaseConfiguration from '../../configuration/db-config.json';
import { CheckIn } from "../../models/checkin.model";


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

    public getAllCheckIns(): Promise<Array<CheckIn>>{
        return new Promise((resolve, reject) =>{
            this.connect().then((connection: Connection) =>{
                r.db(databaseConfiguration.databaseName)
                .table('checkins')
                .filter({})
                .run(connection)
                .then((response: Array<CheckIn>) =>{
                    resolve(response);
                }).catch((error) =>{
                    this.loggerService.error(error, "Error while retrieving checkins.");
                });
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