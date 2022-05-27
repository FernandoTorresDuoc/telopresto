import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AutenticacionService } from '../services/autenticacion.service';

@Component({
  selector: 'app-modificar-pass',
  templateUrl: './modificar-pass.page.html',
  styleUrls: ['./modificar-pass.page.scss'],
})
export class ModificarPassPage implements OnInit {

  constructor(private router: Router,
    private Autenticacion: AutenticacionService,
    private toastController: ToastController,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  usuarioPass ={
    password1:'',
    password2:''

  }
  
  
  contrasenaActualizada(){
    if(this.usuarioPass.password1.replace(/\s/g,'')==='' || this.usuarioPass.password2.replace(/\s/g,'')===''){
      this.notificacionMensajeEnv('Ups!','Los campos no pueden ser vacíos');
    }else{
      if(this.usuarioPass.password1 ===this.usuarioPass.password2){
        this.Autenticacion.cambiarContrasena(this.Autenticacion.mail, this.Autenticacion.codigoOtp,this.usuarioPass.password2).subscribe(data=>{
          console.log(data[0][0]._resultado_out);
          if(data[0][0]._resultado_out === 0){
            this.alertaGenerica('¡Éxito!', 'Contraseña cambiada exitosamente')
            this.router.navigate(['login']);
          }else{
            this.alertaGenerica('¡Ups!', 'No se ha podido cambiar contraseña')
          }   
        }) 
      }else{
        this.notificacionMensajeEnv('Ups!','Las contraseñas no coinciden');
      }

    }

    
  }


  async alertaGenerica(header, message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
    }

  async notificacionMensajeEnv(header, message) {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      icon: 'information-circle',
      position: 'top',
      buttons: [
       {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {

          }
        }
      ]

      
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
