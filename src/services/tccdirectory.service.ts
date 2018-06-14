import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TccDirectoryService {

    private businessesUrl = 'http://tccdirectory.1click.pf/api/businesses';
    private skillsUrl = 'http://tccdirectory.1click.pf/api/skills';
    private detailsUrl = 'http://tccdirectory.1click.pf/api/business/';
    private searchUrl = 'http://tccdirectory.1click.pf/api/search';

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

    getListDetails(id): Observable<string[]> {
        return this.http.get(this.detailsUrl + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    postSearch(skillsId): Observable<string[]> {
        return this.http.post(this.searchUrl,{ "skills" : skillsId})
            .map(this.extractData)
            .catch(this.handleError);
    }

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
