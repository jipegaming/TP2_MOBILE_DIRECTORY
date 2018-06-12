import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BusinessesGlobal } from '../../models/businesses-global.model';
import { TccDirectoryService } from '../../services/tccdirectory.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    list: BusinessesGlobal = new BusinessesGlobal();

    constructor(public navCtrl: NavController, public navParams: NavParams, private tccDirectoryService: TccDirectoryService) {

        this.tccDirectoryService.getListBusinesses()
            .then(businessesFetched => {
                this.list = businessesFetched;
                console.log(this.list);
            });

    }

}
