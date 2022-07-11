import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { AutenticacionService } from './autenticacion.service';
import { IonLoaderService } from '../services/ion-loader.service';
import { ModalArrendatarioComponent } from '../modal-arrendatario/modal-arrendatario.component';
import { ModalController } from '@ionic/angular';
import { ModalArrendadorComponent } from '../inicio-arrendador/modal-arrendador/modal-arrendador.component';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  message = '';
  messages = [];
  currentUser = '';
  numerodetransaccion ='';
  idArrendador:number;
  idServicio:number;
  idArrendatario: number;
  constructor(private socket:Socket,
              private AutenticacionService: AutenticacionService,
              private alertController:AlertController,
              public loadingController: LoadingController,
              private IonLoaderService:IonLoaderService,
              private ModalController:ModalController) { 
    this.socket.connect();


    this.currentUser = localStorage.getItem('userLogged');
    this.socket.emit('set-name', localStorage.getItem('userLogged'));
    this.socket.fromEvent('users-changed').subscribe(data =>{
      console.log('datos:',data);
    }
    )
    /*this.socket.fromEvent('message').subscribe(message=>{
      console.log('New:', message);
    })*/

    this.socket.fromEvent('arrendar').subscribe(data=>{
      var dividir = data['msg'].split(";");
      this.idServicio = dividir[2];
      this.idArrendador =  dividir[3];
      this.idArrendatario =  dividir[1];
      let user = data['user'];
      console.log(data);
      if(data['event'] = 'arrendar'){

        
        if(dividir[3] ===localStorage.getItem('userLogged')){
          this.presentAlertConfirm("Alguien quiere arrendar tu baño", "Presiona aceptar para ver los datos del usuario y permitir entregar tus datos.");
        }
      }
    })

    this.socket.fromEvent('confirmararriendo').subscribe(data=>{
      var dividir = data['msg'].split(";");
      console.log(data);
      if(data['event'] = 'confirmararriendo'){
            if(localStorage.getItem('userLogged')== dividir[3]){
              this.IonLoaderService.dismissLoader();
              this.presentAlertConfirm2('Confirmado!','Dirígete a la ubicación para usar el servicio.');
              this.idArrendatario = dividir[3];
              this.idArrendador = dividir[1];
              this.numerodetransaccion = dividir[4];
              
              console.log('arrendatario: ' + this.idArrendatario);
              console.log('arrendador: ' + this.idArrendador);
              
            }
        }
    })
  }

  sendMessage(){
    this.socket.emit('send-message',{ text:this.message} );
    this.message = '';
  }
  arrendar(){
    this.socket.emit('arrendar',{ text:this.message} );
    this.message = '';
  }
  confirmararriendo(){
    this.message = `confirmararriendo;${this.idArrendador};${this.idServicio};${this.idArrendatario};${this.numerodetransaccion}`
    this.confirmarArriendo();      
  }
  
  confirmarArriendo(){
    this.socket.emit('confirmararriendo',{ text:this.message} );
    this.message = '';
  }

  ionViewWillLeave(){
    this.socket.disconnect();
  }


  async presentAlertConfirm(header, message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: [
        {
          text: 'Rechazar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            console.log('entre cotito');
            
            this.AutenticacionService.crearTransaccion(this.AutenticacionService.marker.precio, this.idServicio, 
              this.idArrendatario).subscribe(data=>{
                console.log(data);
                if(data[0][0]._resultado_out > 0){
                  console.log("Data insertada correctamente");
                  this.numerodetransaccion = data[0][0]._resultado_out;
                  this.confirmararriendo();

                  this.openModalArrendador();

                  
                }else{
                  console.log('Ha ocurrido un error');
                  
                }
                
              });
          }
        }
      ]
    });

    await alert.present();
  }

    async presentAlertConfirm2(header, message) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: header,
        message: message,
        buttons: [
          {
            text: 'Rechazar',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Aceptar',
            id: 'confirm-button',
            handler: () => {
              this.openModalArrendatario();
            }
          }
        ]
      });
  
      await alert.present();
    }

    async openModalArrendatario(){

      const modal = await this.ModalController.create({
  
        component: ModalArrendatarioComponent
      });
  
      await modal.present();
    }
    async openModalArrendador(){

      const modal = await this.ModalController.create({
  
        component: ModalArrendadorComponent
      });
  
      await modal.present();
    }
  
    async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 60000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 60000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}
