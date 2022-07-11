import { NgModule, ErrorHandler } from '@angular/core';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { interval, Subject } from 'rxjs';
import { Marker } from '../../interfaces/marker';
import { Servicio } from '../../interfaces/servicio';
import { Usuario } from '../../interfaces/usuario';
import { AutenticacionService } from '../../services/autenticacion.service';
import { WebsocketService } from '../../services/websocket.service';
declare var google;

export interface Entry{
  created: Date;
  id:string;
}

export interface TimeSpan{
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-modal-arrendador',
  templateUrl: './modal-arrendador.component.html',
  styleUrls: ['./modal-arrendador.component.scss'],
})
export class ModalArrendadorComponent implements OnInit {

  public interval;
  private destroyed$ = new Subject();
  newId: string;
  entries: Entry[]= [];

  usuario: Usuario;
  servicio : Servicio;
  mapRef = null;
  infoWindowRef = null;
  markers: Marker[] = [
  ];
  marker: Marker;
  isDisableI=false;
  isDisableT=true;
  mostrarTiempo = false;
  constructor(private modalCtrl: ModalController,
              private autenticationService: AutenticacionService,
              private WebSocketService: WebsocketService,
              private loadingCtrl: LoadingController,
              private changeDetector: ChangeDetectorRef) {
                this.infoWindowRef = new google.maps.InfoWindow();
               }

  ngOnInit() {
   this.recuperarUsuario(this.WebSocketService.idArrendatario);
   //this.iniciarServicio();   
   this.recuperarServicio(this.WebSocketService.idServicio);
  //  this.loadMap();
    this.newId = 'first';
    this.addEntry();
    this.interval(1000).subscribe(()=>{
      if(!this.changeDetector['destroyed']){
        this.changeDetector.detectChanges();
      }
    });
    this.changeDetector.detectChanges();

  }

  getElapsedTime(entry: Entry): TimeSpan{
    let totalSeconds = Math.floor((new Date().getTime()- entry.created.getTime())/1000);
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if(totalSeconds>=3600){
      hours = Math.floor(totalSeconds/3600);
      totalSeconds -=3600 * hours;
    }
    if(totalSeconds>=60){
      minutes = Math.floor(totalSeconds/60);
      totalSeconds -= 60 * minutes;
    }
     seconds = totalSeconds;

     return{
        hours:hours,
        minutes:minutes,
        seconds:seconds
     };
  }

  addEntry(){
    this.entries.push({
      created: new Date(),
      id: this.newId
    });
    this.newId = '';
  }

  ngOnDestroy(){
    this.destroyed$.next();
    this.destroyed$.complete();
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
        // console.log(this.usuario);
        
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
  
  iniciarServicio(){
    this.autenticationService.cambiarEstadoTransaccion('U', this.WebSocketService.numerodetransaccion).subscribe(data=>{
      console.log(data);
      this.isDisableI=true;
      this.isDisableT=false;

      this.mostrarTiempo=true;

    })
  }

    terminarServicio(){
      console.log('terminar servicio');
      this.autenticationService.cambiarEstadoTransaccion('T', this.WebSocketService.numerodetransaccion).subscribe(data=>{
        console.log(data);

  
      })
      
    }
  }

  // async loadMap() {
  //   const loading = await this.loadingCtrl.create();
  //   await loading.present();

    
  //   //const marker = this.markers[0];
  //   const mapEle: HTMLElement = document.getElementById('map');
  //   this.marker.latitud = this.servicio.latitud;
  //   this.marker.longitud = this.servicio.longitud;
  //   this.marker.id_servicio = this.servicio.id_servicio;
  //   this.markers.push(this.marker);
  //   this.markers.forEach(element=>{
  //     console.log('Marker-->',element);
  //   })
  //   this.mapRef = new google.maps.Map(mapEle, {
  //     //center: {lat: marker.lat, lng: marker.lng},
  //     //zoom: 15
  //     center:{lat: this.marker.latitud, lng: this.marker.longitud },
  //     zoom:17
  //   });
  //   google.maps.event
  //   .addListenerOnce(this.mapRef, 'idle', () => {
  //     loading.dismiss();
  //     this.loadMarkers();
  //   });
  // }


  // private loadMarkers(){
  //   this.markers.forEach(marker =>{
  //     const markerObj = this.addMarker(marker);
  //     marker.markerObj = markerObj;

  //   });
  // }

  // private addMarker(itemMarker: Marker){
  //   const icon={
  //         url: 'assets/img/icons8_toilet_bowl_50px.png',
  //         scaledSize: new google.maps.Size(60, 60), // scaled size
  //         origin: new google.maps.Point(0,0), // origin
  //         anchor: new google.maps.Point(0, 0) // anchor
  //   }

  //   const marker = new google.maps.Marker({
  //     position: {lat:itemMarker.latitud, lng:itemMarker.longitud},
  //     map: this.mapRef,
  //     title: itemMarker.descripcion,
  //     icon: icon
  //     // icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_sJrsHD8xN8RdZomBcjW7Y_lYZGaVAgry6w&usqp=CAU'
  //   });
  //   return marker;
  // }
