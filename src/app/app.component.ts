import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TccDirectoryService } from '../services/tccdirectory.service';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;
    // Concernant les Skills
    dataSki: any;
    skills: string[];
    errorMessage: string;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private tccDirectoryService: TccDirectoryService) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
            this.getListSkills();
        });
    }

    getListSkills() {
        this.tccDirectoryService.getListSkills()
            .subscribe(
                res => {
                    this.dataSki = res;
                    console.log("AppComp/dataSki", res);
                    this.skills = this.dataSki.data;
                    console.log("AppComp/skills", this.dataSki.data);
                },
                error => this.errorMessage = <any>error);
    }

}

