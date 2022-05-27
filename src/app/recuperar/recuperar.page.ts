import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController,ToastController } from '@ionic/angular';
import { AutenticacionService } from '../services/autenticacion.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  mostrarInputCodigo: boolean;
  ocultarEnviarMail: boolean = false;
  nombre: string = '';
  run: number = 0;
  id_usuario: number = 0;
  codigoOtp: number = 0;

  usuarioForm = {
    mail:'',
    codigoOtp:''
  }
  
  constructor(private router: Router,
    private toastController: ToastController,
    private Autenticacion: AutenticacionService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  enviarMail(){
    let mail = this.usuarioForm.mail;
    // let codigoOtpInput = this.usuarioForm.codigoOtp;
    if(mail === '' ){
      this.notificacionMensajeEnv('Atención!','Este campo no puede estar vacío! Debe ingresar un Correo válido.')
     
    }else{

      this.Autenticacion.consultarDatosUsuario(mail).subscribe(data=>{
        if(data[0] === undefined){
          console.log('Error Interno');
          this.alertaGenerica('Error!','El correo no existe en nuestros registros');
          
        }else{
          // console.log(data[0].Nombre);
          this.nombre= data[0].Nombre;
          this.id_usuario= data[0].id_usuario;
          this.run= data[0].rut;
          
          this.Autenticacion.crearCodigoOtp(mail, this.run, this.id_usuario).subscribe(data=>{
            if(data[0][0] === undefined){
              console.log('Error Interno');

            }else{
              // console.log(data[0][0]._salida_out);
              this.codigoOtp = data[0][0]._salida_out;
                this.Autenticacion.enviarCorreo(this.nombre, mail, this.codigoOtp).subscribe(data=>{
                  console.log('enviar correo');
                  this.notificacionMensajeEnv('Correo enviado!','Te hemos enviado un código de autorización. Si tu correo es válido, revisa tu bandeja de entrada.')
                  this.mostrarInputCodigo = true;
                  this.ocultarEnviarMail = true;
                  
                  
                })      
            }
            
          })
        }
        
      });

      // console.log('envia correo');
      // this.notificacionMensajeEnv('Correo enviado!','Te hemos enviado un código de autorización. Si tu correo es válido, revisa tu bandeja de entrada.')
      //this.router.navigate(['login'])
      // this.mostrarInputCodigo = true;
      // this.ocultarEnviarMail = true;

    }
  }

  verificaCodigo(){
    this.Autenticacion.validarCodigo(this.usuarioForm.codigoOtp, this.usuarioForm.mail, this.id_usuario).subscribe(data=>{

      console.log(data[0][0]._resultado_out);
      
      if(data[0][0]._resultado_out === 0){
                
        this.Autenticacion.mail = this.usuarioForm.mail;
        this.Autenticacion.codigoOtp = this.usuarioForm.codigoOtp;
        
        this.router.navigate(['modificar-pass']);

      }else{
        this.notificacionMensajeEnv('Código Inválido!','Por favor, ingresa un código válido')
  
      }

      
      
    })
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
