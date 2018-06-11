import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Businesses } from '../models/businesses.model';

@Injectable()
export class tccDirectoryService {

    private baseUrl: string = 'https://tccdirectory.1click.pf/api';
    private entreprises: string = 'business';

    constructor(private http: Http) { }

    public getListBusinesses(): Promise<any> {
        const url = `${this.baseUrl}/${this.entreprises}/`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(error => console.log('Une erreur est survenue ' + error))
    }

}
