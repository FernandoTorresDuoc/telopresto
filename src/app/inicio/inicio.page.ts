import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Marker } from '../interfaces/marker';
import { AutenticacionService } from '../services/autenticacion.service';

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

  mapRef = null;
  infoWindowRef = null;
  markers: Marker[] = [
    // {
    //   lat: this.listaServicios[0][0].latitud, 
    // lng: this.listaServicios[0][0].longitud,
    // title: this.listaServicios[0][0].categoria,
    // image: '',
    // text: this.listaServicios[0][0].descripcion
    // },
    // {
    //   lat: this.listaServicios[0][1].latitud, 
    // lng: this.listaServicios[0][1].longitud,
    // title: this.listaServicios[0][1].categoria,
    // image: '',
    // text: this.listaServicios[0][1].descripcion
    // },
    // {
    //   lat: this.listaServicios[0][2].latitud, 
    // lng: this.listaServicios[0][2].longitud,
    // title: this.listaServicios[0][2].categoria,
    // image: '',
    // text: this.listaServicios[0][2].descripcion
    // },


    // {
    //   lat: -33.446923638511485, 
    // lng: -70.65764190006061,
    // title: 'Baño 1',
    // image: '',
    // text: 'Bañito'
    // },
    // {
    //   lat: -33.443853011823265,  
    // lng: -70.65752388329577,
    // title: 'Baño 2',
    // image: '',
    // text: 'Bañito'
    // },
    // {
    //   lat: -33.447183249148104,  
    // lng:  -70.66237331687313,
    // title: 'Baño 3',
    // image: '',
    // text: 'Bañito'
    // }
  ];
  
  constructor( private loadingCtrl: LoadingController,
    private alertController:AlertController,
    private toastController: ToastController,
    private router: Router,
    private Autenticacion:AutenticacionService) { 
    this.infoWindowRef = new google.maps.InfoWindow();
    
  }

  ngOnInit() {
    this.loadMap();
    this.obtenerServicios();
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


  async OnSlideDidChange(){
    const currentSlide = await this.slides.getActiveIndex();
    
    // console.log(currentSlide);
    // console.log(this.markers[currentSlide]);
    const marker = this.markers[currentSlide];
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
        // this.marker2.id_servicio = data[elemento].id_servicio;
        // marker2.categoria = data[elemento].categoria;
        // marker2.descripcion = data[elemento].descripcion;
        // marker2.direccion = data[elemento].direccion;
        // marker2.dia_ini = data[elemento].dia_ini;
        // marker2.dia_ter = data[elemento].dia_ter;
        // marker2.hora_ini = data[elemento].hora_ini;
        // marker2.hora_ter = data[elemento].hora_ter;
        // marker2.precio = data[elemento].precio;
        // marker2.fecha_creacion = data[elemento].fecha_creacion;
        // marker2.estado = data[elemento].estado;
        // marker2.id_usuario = data[elemento].id_usuario;
        // marker2.latitud = data[elemento].latitud;
        // marker2.longitud = data[elemento].longitud;
        
        // console.log(data[elemento].id_servicio);
        // console.log("Marker: "+this.marker2.id_servicio);
        // console.log(numero);
        
        
        this.markers.push(data[elemento]);
        console.log(this.markers);
        
        // console.log(this.listaServicios[0]); //ya tenemos la info de la bd
      }
    })
  }

  async presentAlert(subtitulo, message) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Detalle',
      subHeader: subtitulo,
      message: message,
      buttons: [{
        text: 'Arrendar',
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
