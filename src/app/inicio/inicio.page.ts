import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Marker } from '../interfaces/marker';
import { AutenticacionService } from '../services/autenticacion.service';
import { ModalController } from '@ionic/angular'
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { Socket } from 'ngx-socket-io';
import { WebsocketService } from '../services/websocket.service';
import { IonLoaderService } from '../services/ion-loader.service';
import { ModalArrendatarioComponent } from '../modal-arrendatario/modal-arrendatario.component';

declare var google;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {


  @ViewChild(IonSlides) slides: IonSlides;

  // listaServicios: Marker[] =[];
  // marker2: Marker;
  ocultarEnviarMail:boolean;
  currentSlide: number = 0;
  marker = 0;
  mapRef = null;
  infoWindowRef = null;
  markers: Marker[] = [
    
  ];
  
  constructor( private loadingCtrl: LoadingController,
    private alertController:AlertController,
    private toastController: ToastController,
    private router: Router,
    private Autenticacion:AutenticacionService,
    private ModalController:ModalController,
    private WebSocketService: WebsocketService,
    private IonLoaderService:IonLoaderService
    ) { 
    this.infoWindowRef = new google.maps.InfoWindow();
    
  }

  ngOnInit() {
    this.loadMap();
    this.obtenerServicios();
    /*this.socket.connect();
    let name =`User-${new Date().getTime()}`;
    this.currentUser = localStorage.getItem('userLogged');
    this.socket.emit('set-name', localStorage.getItem('userLogged'));
    this.socket.fromEvent('users-changed').subscribe(data =>{
      console.log('datos:',data);
    }
    )*/
  }

  enviarMensaje(){
    this.WebSocketService.message = `arrendar;${localStorage.getItem('userLogged')};${this.Autenticacion.slideSeleccionada};${this.Autenticacion.idUsuarioArrendador}`
    this.WebSocketService.sendMessage();
    
  }
  arrendar(){
      this.WebSocketService.message = `arrendar;${localStorage.getItem('userLogged')};${this.Autenticacion.slideSeleccionada};${this.Autenticacion.idUsuarioArrendador}`
      this.WebSocketService.arrendar();      
      this.IonLoaderService.simpleLoader();
    }

  arrendarServicio(){
    this.markers = [];
    this.Autenticacion.obtenerServicios().subscribe(data =>{
      for(let elemento in data){
        // console.log(data);
        let numero: number;
        numero = data[elemento].id_servicio;
        this.markers.push(data[elemento]);
        this.Autenticacion.markers = this.markers;
        this.router.navigate(['arriendo-arrendatario'])
    }}, err =>{
      this.presentAlert('Ups!','Algo salió mal :(')
    })
    
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
      center:{lat: marker.latitud, lng: marker.longitud },
      zoom:17
    });
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.loadMarkers();
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

  private loadMarkers(){
    this.markers.forEach(marker =>{
      const markerObj = this.addMarker(marker);
      marker.markerObj = markerObj;

    });
  }



  async tap(){
    const currentTap = await this.slides.getActiveIndex();
    const marker = this.markers[currentTap];
    
    // this.presentToastWithOptions('Horario: ' + marker.hora_ini,' - ' + marker.hora_ter);
    this.presentAlert(marker.categoria,marker.descripcion+'<br>'+marker.direccion);
    console.log(marker);
    // console.log(marker.descripcion);
  }

  async obtenerImagenes(id_servicio, primario){
    this.Autenticacion.obtenerImagenes(id_servicio).subscribe(data=>{
      for(let elemento in data){

        console.log(data);
      }
    })
  };

  
  async obtenerImagenPrimaria(id_servicio){
    this.Autenticacion.obtenerImagenes(id_servicio).subscribe(data=>{
      for(let elemento in data){

        console.log(data);
      }
    })
  };


  async OnSlideDidChange(){
    this.currentSlide = await this.slides.getActiveIndex();
    // console.log(currentSlide);
    // console.log(this.markers[currentSlide]);
    const marker = this.markers[this.currentSlide];
    this.Autenticacion.slideSeleccionada = marker.id_servicio;
    console.log('Id de servicio-->', this.Autenticacion.slideSeleccionada)
    this.Autenticacion.idUsuarioArrendador = marker.id_usuario;
    console.log('ID usuario arrendador-->', this.Autenticacion.idUsuarioArrendador);
    
    this.mapRef.panTo({lat: marker.latitud, lng: marker.longitud});
    
    const markerObj = marker.markerObj;
    this.infoWindowRef.setContent(marker.descripcion);
    console.log(marker.descripcion);
    
    this.infoWindowRef.open(this.mapRef, markerObj)
  }

  obtenerServicios(){
    // console.log('hola');
    // console.log(this.listaServicios);
    this.Autenticacion.obtenerServicios().subscribe(data=>{
      for(let elemento in data){
        // console.log(data);
        let numero: number;
        numero = data[elemento].id_servicio;
        this.markers.push(data[elemento]);
        
        // console.log(this.listaServicios[0]); //ya tenemos la info de la bd
      }
    })
  
  }

  async openModal(){

    const modal = await this.ModalController.create({

      component: ModalComponentComponent
    });

    await modal.present();
  }

  async openModalArrendatario(){

    const modal = await this.ModalController.create({

      component: ModalArrendatarioComponent
    });

    await modal.present();
  }

  async presentAlert(subtitulo, message) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Detalle',
      subHeader: subtitulo,
      message: message,
      buttons: [{
        text: 'Ok',
        cssClass: 'my-custom-class',
        handler: ()=>{
          
        }
      }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }




}
