import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';

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
        this.navCtrl.push(DetailsPage, { 'id': businessId });
    }
    // Concernant les Skills
    dataSki: any;
    skills: string[];
    filtre: any;
    displayMode = "normal";
    // Concernant les Details
    dataDet = ['name'];

    constructor(

        public navCtrl: NavController,
        public navParams: NavParams,
        platform: Platform,
        public alertCtrl: AlertController,
        private tccDirectoryService: TccDirectoryService) {

        platform.ready().then(() => {
            this.getListBusinesses();
            this.getListSkills();
        });
    }

    getListBusinesses() {
        console.log("getListBusinesses this.displayMode", this.displayMode);
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

    getListSkills() {
        this.tccDirectoryService.getListSkills()
            .subscribe(
                res => {
                    this.dataSki = res;
                    console.log("HomePage/dataSki", res);
                    this.skills = this.dataSki.data;
                    console.log("HomePage/skills", this.dataSki.data);
                },
                error => this.errorMessage = <any>error);
    }

    postSearch(value) {
        if (value) {
            this.displayMode = "search";
            console.log("postSearch value = ", value);
            this.businesses = [];
            this.tccDirectoryService.postSearch(value)
                .subscribe(
                    res => {
                        console.log(res)
                        for (let i = 0; i < res.length; i++) {
                            if (this.businesses.indexOf(res[i]) == -1) {
                                this.businesses.push(res[i]);
                            }
                        }
                        console.log("postSearch this.businesses", this.businesses);
                        console.log("postSearch this.displayMode", this.displayMode);
                    },
                    error => this.errorMessage = <any>error);
        } else {
            this.displayMode = "normal";
            this.getListBusinesses();
            console.log("else: ", this.getListBusinesses());
        }
    }

}
