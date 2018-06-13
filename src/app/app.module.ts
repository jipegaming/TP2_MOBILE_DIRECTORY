import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { GeoPage } from '../pages/geo/geo';
import { WelcomePage } from '../pages/welcome/welcome';
import { HomePageModule } from '../pages/home/home.module';

import { Geolocation } from '@ionic-native/geolocation';
import { SQLite } from '@ionic-native/sqlite';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SMS } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';

import { TccDirectoryService } from '../services/tccdirectory.service';
import { HttpModule } from '@angular/http'

@NgModule({
    declarations: [
        MyApp,
        // HomePage,
        DetailsPage,
        GeoPage,
        WelcomePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        HomePageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        // HomePage,
        DetailsPage,
        GeoPage,
        WelcomePage
    ],
    providers: [
        TccDirectoryService,
        StatusBar,
        SplashScreen,
        Geolocation,
        SQLite,
        InAppBrowser,
        SMS,
        CallNumber,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
