import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class Services {

    private baseUrl: string = 'https://tccdirectory.1click.pf/api/';
    private apiKey: string = '<API_KEY>';

    constructor(private http: Http) { }

    public getSkills(): Promise<any> {
		const url = `${this.baseUrl}objects?apiKey=${this.apiKey}`;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json())
        .catch(error => console.log('Une erreur est survenue ' + error))
    }

}
