import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',

})
export class WelcomePage {

    progress = 0;

    constructor(private platform: Platform, public navCtrl: NavController) {
        this.platform.ready().then(() => {
            this.redirectToHome();
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WelcomePage');
    }

    redirectToHome() {
        let limit = 5;
        let counter = 0;
        let myInternal = setInterval(() => {
            counter++;
            console.log('count', counter);
            this.progress = counter * 100 / limit;
            console.log('progress', this.progress);
            if (counter == limit) {
                clearInterval(myInternal);
                this.navCtrl.push(HomePage);
            }
        }, 1000);
    }
}
