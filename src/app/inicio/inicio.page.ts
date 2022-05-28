import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController } from '@ionic/angular';
import { Marker } from '../interfaces/marker';

declare var google;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  mapRef = null;
  infoWindowRef = null;
  markers: Marker[] = [
    {
      lat: -33.446923638511485, 
    lng: -70.65764190006061,
    title: 'Baño 1',
    image: 'https://www.sodimac.cl/static/campana/ideas/2020-banno-y-cocina/banno/img/03-EDP2_bano@2x.jpg',
    text: 'Bañito'
    },
    {
      lat: -33.443853011823265,  
    lng: -70.65752388329577,
    title: 'Baño 2',
    image: 'https://www.sodimac.cl/static/campana/ideas/2020-banno-y-cocina/banno/img/03-EDP2_bano@2x.jpg',
    text: 'Bañito'
    },
    {
      lat: -33.447183249148104,  
    lng:  -70.66237331687313,
    title: 'Baño 3',
    image: 'https://www.sodimac.cl/static/campana/ideas/2020-banno-y-cocina/banno/img/03-EDP2_bano@2x.jpg',
    text: 'Bañito'
    }
  ];
  
  constructor( private loadingCtrl: LoadingController) { 
    this.infoWindowRef = new google.maps.InfoWindow();
  }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    //const marker = this.markers[0];
    const mapEle: HTMLElement = document.getElementById('map');
    const marker = this.markers[0];
    this.mapRef = new google.maps.Map(mapEle, {
      //center: {lat: marker.lat, lng: marker.lng},
      //zoom: 15
      center:{lat: marker.lat, lng: marker.lng },
      zoom:16
    });
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.loadMarkers();
    });
  }

  private addMarket(itemMarker: Marker){
    const marker = new google.maps.Marker({
      position: {lat:itemMarker.lat, lng:itemMarker.lng},
      map: this.mapRef,
      title: itemMarker.title
    });
    return marker;
  }

  private loadMarkers(){
    this.markers.forEach(marker =>{
      const markerObj = this.addMarket(marker);
      marker.markerObj = markerObj;

    });
  }


  async OnSlideDidChange(){
    const currentSlide = await this.slides.getActiveIndex();
    console.log(currentSlide);
    console.log(this.markers[currentSlide]);
    const marker = this.markers[currentSlide];
    this.mapRef.panTo({lat: marker.lat, lng: marker.lng});
    
    const markerObj = marker.markerObj;
    this.infoWindowRef.setContent(marker.title);
    console.log(marker.title);
    
    this.infoWindowRef.open(this.mapRef, markerObj)
  }

}
