import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-pass',
  templateUrl: './modificar-pass.page.html',
  styleUrls: ['./modificar-pass.page.scss'],
})
export class ModificarPassPage implements OnInit {

  usuarioForm = {
    nuevaPass:'',
    confirmaNuevaPass:''
  }

  constructor(private router: Router,
    private toastController: ToastController) { }

  

  ngOnInit() {
  }


  contrasenaActualizada(){
    if(this.usuarioForm.nuevaPass !== this.usuarioForm.confirmaNuevaPass){
      console.log('no son iguales');
      this.notificacionMensajeEnv('Atención!','Las contraseñas no coinciden! Favor ingresalas nuevamente.');

      
    }else if(this.usuarioForm.nuevaPass === ''|| this.usuarioForm.confirmaNuevaPass === ''){
      console.log('estan vacios');
      this.notificacionMensajeEnv('Atención!','Los campos no pueden estar vacios! Intentelo nuevamente.');
    }  
    else{
      console.log('son iwales');
      this.notificacionMensajeEnv('','Contraseña modificada correctamente!.')
      //this.router.navigate(['login']);

    }

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
