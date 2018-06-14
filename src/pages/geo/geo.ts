import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { TccDirectoryService } from '../../services/tccdirectory.service';

declare var google;
@Component({
    selector: 'page-geo',
    templateUrl: 'geo.html',
})
export class GeoPage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform, private tccDirectoryService: TccDirectoryService, public geolocation: Geolocation) {

        platform.ready().then(() => {

        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GeoPage');
        this.loadMap();
    }

    loadMap() {
        this.geolocation.getCurrentPosition().then((position) => {
            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        }, (err) => {
            console.log(err);
        });
    }

    addMarker() {
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        let content = "<h4>Information!</h4>";
        this.addInfoWindow(marker, content);
    }

    addInfoWindow(marker, content) {
        let infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });
    }

}
