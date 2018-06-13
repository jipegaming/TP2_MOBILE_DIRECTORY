import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { BusinessesGlobal } from '../models/businesses-global.model';
import { SkillsGlobal } from '../models/skills-global.model';

@Injectable()
export class TccDirectoryService {

    private businessesUrl: string = 'http://tccdirectory.1click.pf/api/businesses';
    private skillsUrl: string = 'http://tccdirectory.1click.pf/api/skills';

    constructor(private http: Http) {

    }

    public getListBusinesses(): Promise<any> {
        const url = `${this.businessesUrl}`;
        return this.http.get(url)
            .toPromise()
            .then((response) => {
        console.log("getListBusinesses",url);
                this.businessesUrl = response.json().next_page_url;
                return response.json() as BusinessesGlobal;
            })
            .catch(error => console.log('getListBusinesses Une erreur est survenue ' + error))
    }

    public getListSkills(): Promise<any> {
        const url = `${this.skillsUrl}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as SkillsGlobal)
            .catch(error => console.log('Une erreur est survenue ' + error))
    }

}
