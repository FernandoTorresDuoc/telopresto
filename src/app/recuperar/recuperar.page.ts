import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  mostrarInputCodigo: boolean;
  ocultarEnviarMail: boolean = false;

  usuarioForm = {
    mail:''
  }
  
  codigoOtp = String('');
  constructor(private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  enviarMail(){
    let mail = this.usuarioForm.mail;
    if(mail === '' ){
      this.notificacionMensajeEnv('Atención!','Este campo no puede estar vacío! Debe ingresar un Correo válido.')
     
    }else{

      console.log('envia correo');
      this.notificacionMensajeEnv('Correo enviado!','Te hemos enviado un código de autorización. Si tu correo es válido, revisa tu bandeja de entrada.')
      //this.router.navigate(['login'])
      this.mostrarInputCodigo = true;
      this.ocultarEnviarMail = true;

    }
  }

  verificaCodigo(){
    if(this.codigoOtp === ''){
      console.log('no pasa');
      
      this.notificacionMensajeEnv('Atención!','Este campo no puede estar vacío! Debe ingresar el codigo correcto.')

    }else{
      this.router.navigate(['modificar-pass']);
      this.notificacionMensajeEnv('','Codigo Correcto!')  
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
