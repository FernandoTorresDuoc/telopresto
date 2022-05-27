import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Marker } from '../interfaces/marker';

declare var google;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  mapRef = null;
  markers: Marker[] = [];
  constructor( private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    //const marker = this.markers[0];
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      //center: {lat: marker.lat, lng: marker.lng},
      //zoom: 15
      center:{lat:4.6486259, lng: -74.2478946},
      zoom:8
    });
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
    });
  }

}