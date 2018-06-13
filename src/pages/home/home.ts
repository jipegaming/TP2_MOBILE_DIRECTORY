import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import { BusinessesGlobal } from '../../models/businesses-global.model';
// import { SkillsGlobal } from '../../models/skills-global.model';
import { TccDirectoryService } from '../../services/tccdirectory.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    // listBusinesses: BusinessesGlobal = new BusinessesGlobal();
    // listBusinesses = [];
    // listSkills: SkillsGlobal = new SkillsGlobal();
    // displaySkills = false;

    // Concernant les Businesses
    dataBus: any;
    businesses: string[];
    errorMessage: string;
    page = 1;
    perPage = 0;
    totalData = 0;
    totalPage = 0;

    // Concernant le Menu Toogle
    activeMenu: string;

    // Concernant les Skills
    dataSki: any;
    skills: string[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private tccDirectoryService: TccDirectoryService) {

        this.getListBusinesses();
        this.getListSkills();
        // this.tccDirectoryService.getListSkills()
        //     .then(businessesFetched => {
        //         this.listSkills = businessesFetched;
        //         console.log("HomePage getListSkills", this.listSkills);
        //     });

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
        }, 500);
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

    // updateDisplaySkills() {
    //     if (this.displaySkills) this.displaySkills = false;
    //     else this.displaySkills = true;
    // }

}
