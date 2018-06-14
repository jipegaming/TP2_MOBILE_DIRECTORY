import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { TccDirectoryService } from '../../services/tccdirectory.service';

@Component({
    selector: 'page-details',
    templateUrl: 'details.html',
})
export class DetailsPage {

    dataDet = ['name', 'description', 'logo', 'adresse', 'email', 'facebook_url', 'linkedin_url', 'website_url', 'friday_end', 'friday_start', 'monday_end', 'monday_start', 'saturday_start', 'saturday_end', 'sunday_end', 'sunday_start', 'thursday_end', 'thursday_start', 'tuesday_end', 'tuesday_start', 'wednesday_end', 'wednesday_start', 'phone', 'mobile'];
    errorMessage: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform, private tccDirectoryService: TccDirectoryService) {

        platform.ready().then(() => {
            console.log("businessId", this.navParams.get("id"));
            this.getListDetails();
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DetailsPage');
    }

    getListDetails() {
        this.tccDirectoryService.getListDetails(this.navParams.get("id"))
            .subscribe(
                res => {
                    this.dataDet.forEach((element) => {
                        console.log(element);
                        this.dataDet[element] = res[element];
                        // console.log(this.dataDet[element]);
                    })
                    console.log("DetailsPage/dataDet", res);
                },
                error => this.errorMessage = <any>error);
    }

}
