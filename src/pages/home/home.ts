import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { DetailsPage } from '../../pages/details/details';
import { TccDirectoryService } from '../../services/tccdirectory.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    // Concernant les Businesses
    dataBus: any;
    businesses: string[];
    errorMessage: string;
    page = 1;
    perPage = 0;
    totalData = 0;
    totalPage = 0;
    // Push vers Details (plus...)
    push(businessId) {
        this.navCtrl.push(DetailsPage, {'id':businessId});
    }

    constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform, private tccDirectoryService: TccDirectoryService) {

        platform.ready().then(() => {
            this.getListBusinesses();
        });
    }

    getListBusinesses() {
        this.tccDirectoryService.getListBusinesses(this.page)
            .subscribe(
                res => {
                    this.dataBus = res;
                    console.log("HomePage/dataBus", res);
                    this.businesses = this.dataBus.data;
                    console.log("HomePage/businesses", this.dataBus.data);
                    this.perPage = this.dataBus.per_page;
                    console.log("HomePage/perPage", this.dataBus.per_page);
                    this.totalData = this.dataBus.total;
                    console.log("HomePage/totalData", this.dataBus.total);
                    this.totalPage = this.dataBus.last_page;
                    console.log("HomePage/totalPage", this.dataBus.last_page);
                },
                error => this.errorMessage = <any>error);
    }

    doInfinite(infiniteScroll) {
        this.page = this.page + 1;
        setTimeout(() => {
            this.tccDirectoryService.getListBusinesses(this.page)
                .subscribe(
                    res => {
                        this.dataBus = res;
                        console.log("HomePage/dataBus", res);
                        this.perPage = this.dataBus.per_page;
                        console.log("HomePage/perPage", this.dataBus.per_page);
                        this.totalData = this.dataBus.total;
                        console.log("HomePage/totalData", this.dataBus.total);
                        this.totalPage = this.dataBus.last_page;
                        console.log("HomePage/totalPage", this.dataBus.last_page);
                        for (let i = 0; i < this.dataBus.data.length; i++) {
                            this.businesses.push(this.dataBus.data[i]);
                        }
                    },
                    error => this.errorMessage = <any>error);
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 1000);
    }

}
