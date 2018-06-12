import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { BusinessesGlobal } from '../models/businesses-global.model';

@Injectable()
export class TccDirectoryService {

    private baseUrl: string = 'http://tccdirectory.1click.pf/api/';
    private entreprises: string = 'businesses';
    // private pages: number = 1;

    constructor(private http: Http) {

    }

    public getListBusinesses(): Promise<any> {
        const url = `${this.baseUrl}${this.entreprises}`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as BusinessesGlobal)
            .catch(error => console.log('Une erreur est survenue ' + error))
    }

}
