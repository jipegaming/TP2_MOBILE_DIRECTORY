import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BusinessesGlobal } from '../../models/businesses-global.model';
import { SkillsGlobal } from '../../models/skills-global.model';
import { TccDirectoryService } from '../../services/tccdirectory.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    // listBusinesses: BusinessesGlobal = new BusinessesGlobal();
    listBusinesses = [];
    listSkills: SkillsGlobal = new SkillsGlobal();
    displaySkills = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private tccDirectoryService: TccDirectoryService) {

        this.tccDirectoryService.getListBusinesses()
            .then(businessesFetched => {
                this.listBusinesses = businessesFetched.data;
                console.log("HomePage getListBusinesses", this.listBusinesses);
            });

        this.tccDirectoryService.getListSkills()
            .then(businessesFetched => {
                this.listSkills = businessesFetched;
                console.log("HomePage getListSkills", this.listSkills);
            });

    }

    updateDisplaySkills() {
        if (this.displaySkills) this.displaySkills = false;
        else this.displaySkills = true;
    }

    doInfinite(): Promise<any> {
        console.log('Begin async operation');
        return new Promise((resolve) => {
            setTimeout(() => {
                this.tccDirectoryService.getListBusinesses()
                    .then((businessesFetched) => {
                        let businessesT = businessesFetched.data;
                        console.log("doInfinite getListBusinesses businessesT", businessesT);
                        this.listBusinesses.concat(businessesT);
                        console.log("doInfinite getListBusinesses listBusinesses", this.listBusinesses);
                        resolve();
                    });
                console.log('Async operation has ended');
                resolve();
            }, 50);
        })
    }

}
