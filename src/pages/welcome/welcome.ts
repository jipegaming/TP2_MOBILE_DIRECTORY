import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { HomePage } from '../home/home';

let progress = 0;
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',

})
export class WelcomePage {

    database: SQLiteObject;
    progress: any;

    constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
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
            console.log('progress', progress);
            if (counter == limit) {
                clearInterval(myInternal);
                this.navCtrl.push(HomePage)
            }
        }, 1000);
    }
}
