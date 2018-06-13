import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// import { BusinessesGlobal } from '../models/businesses-global.model';
// import { SkillsGlobal } from '../models/skills-global.model';

@Injectable()
export class TccDirectoryService {

    private businessesUrl = 'http://tccdirectory.1click.pf/api/businesses';
    private skillsUrl: string = 'http://tccdirectory.1click.pf/api/skills';

    constructor(public http: Http) {

    }

    getListBusinesses(page): Observable<string[]> {
        return this.http.get(this.businessesUrl + "?page=" + page)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getListSkills(): Observable<string[]> {
        return this.http.get(this.skillsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // public getListSkills(): Promise<any> {
    //     const url = `${this.skillsUrl}`;
    //     return this.http.get(url)
    //         .toPromise()
    //         .then(response => response.json() as SkillsGlobal)
    //         .catch(error => console.log('Une erreur est survenue ' + error))
    // }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
