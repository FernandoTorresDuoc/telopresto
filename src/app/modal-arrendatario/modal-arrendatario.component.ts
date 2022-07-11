import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Marker } from '../interfaces/marker';
import { Servicio } from '../interfaces/servicio';
import { Usuario } from '../interfaces/usuario';
import { AutenticacionService } from '../services/autenticacion.service';
import { WebsocketService } from '../services/websocket.service';
declare var google;

@Component({
  selector: 'app-modal-arrendatario',
  templateUrl: './modal-arrendatario.component.html',
  styleUrls: ['./modal-arrendatario.component.scss'],
})
export class ModalArrendatarioComponent implements OnInit {

  usuario: Usuario;
  servicio : Servicio;
  mapRef = null;
  infoWindowRef = null;
  markers: Marker[] = [
  ];
  marker: Marker;
  constructor(private modalCtrl: ModalController,
              private autenticationService: AutenticacionService,
              private WebSocketService: WebsocketService,
              private loadingCtrl: LoadingController) {
                this.infoWindowRef = new google.maps.InfoWindow();
               }

  ngOnInit() {
   this.recuperarUsuario(this.WebSocketService.idArrendador);
   this.recuperarServicio(this.WebSocketService.idServicio);
   this.loadMap();
  //  console.log(this.WebSocketService.idArrendatario);
   
  }


  close(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  recuperarUsuario(idUsuario){
    this.autenticationService.getUsuario(idUsuario).subscribe(data=>{
      for(let elemento in data){
        this.usuario = data[elemento];
      }
      
    })
  }

  recuperarServicio(idServicio){
    this.autenticationService.recuperarServicio(idServicio).subscribe(data =>{
      console.log('Data -->', data);
      
      for(let elemento in data){
        this.servicio = data[elemento];
        console.log(this.servicio);
        
      }
    })
  }


  async loadMap() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    
    //const marker = this.markers[0];
    const mapEle: HTMLElement = document.getElementById('map');
    this.marker.latitud = this.servicio.latitud;
    this.marker.longitud = this.servicio.longitud;
    this.marker.id_servicio = this.servicio.id_servicio;
    this.markers.push(this.marker);
    this.markers.forEach(element=>{
      console.log('Marker-->',element);
    })
    this.mapRef = new google.maps.Map(mapEle, {
      //center: {lat: marker.lat, lng: marker.lng},
      //zoom: 15
      center:{lat: this.marker.latitud, lng: this.marker.longitud },
      zoom:17
    });
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.loadMarkers();
    });
  }


  private loadMarkers(){
    this.markers.forEach(marker =>{
      const markerObj = this.addMarker(marker);
      marker.markerObj = markerObj;

    });
  }

  private addMarker(itemMarker: Marker){
    const icon={
          url: 'assets/img/icons8_toilet_bowl_50px.png',
          scaledSize: new google.maps.Size(60, 60), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
    }

    const marker = new google.maps.Marker({
      position: {lat:itemMarker.latitud, lng:itemMarker.longitud},
      map: this.mapRef,
      title: itemMarker.descripcion,
      icon: icon
      // icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_sJrsHD8xN8RdZomBcjW7Y_lYZGaVAgry6w&usqp=CAU'
    });
    return marker;
  }
}

