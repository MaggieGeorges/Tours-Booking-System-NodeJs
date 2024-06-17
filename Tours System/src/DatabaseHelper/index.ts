import { ConnectionPool, Request } from "mssql";
import mssql from 'mssql';
import { sqlConfig } from "../config";

export class DbHelper {
    private pool: Promise<ConnectionPool>;

    constructor() {
        this.pool = mssql.connect(sqlConfig);
    }

    private createRequest(emptyRequest: Request, data: { [x: string]: string | number }) {
        const keys = Object.keys(data);
        keys.forEach(key => {
            emptyRequest.input(key, data[key]);
        });
        return emptyRequest;
    }

    async exec(storedProcedure: string, data: { [x: string]: string | number }) {
        const emptyRequest = (await this.pool).request();
        const request = this.createRequest(emptyRequest, data);
        const results = await request.execute(storedProcedure);
        return results;
    }

    async query(queryString: string) {
        const results = await (await this.pool).request().query(queryString);
        return results;
    }
}