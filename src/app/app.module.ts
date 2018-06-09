import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { GeoPage } from '../pages/geo/geo';
import { WelcomePage } from '../pages/welcome/welcome';

import { Geolocation } from '@ionic-native/geolocation';
import { SQLiteObject } from '@ionic-native/sqlite';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SMS } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        DetailsPage,
        GeoPage,
        WelcomePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        DetailsPage,
        GeoPage,
        WelcomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        SQLiteObject,
        InAppBrowser,
        SMS,
        CallNumber,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
