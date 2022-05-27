import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../services/autenticacion.service';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Comuna } from '../interfaces/comuna';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  listaComunas: Comuna[] =[];
  sexo2:String;
  comuna2:Comuna;
  rol: String;
  usuarioFormCrear = {
    run: '',
    dv:'',
    pri_nom: '',
    seg_nom: '',
    pri_ap: '',
    seg_ap: '',
    direccion: '',
    comuna: '',
    mail: '',
    password: '',
    sexo: '',
    rol: '',
    estado: 'A',
  }

  constructor(private Autenticacion: AutenticacionService, 
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private toastController: ToastController,
    private Router: Router) { }

  ngOnInit() {
    // this.cambiarContrasena();
    this.listarComunas();
    // this.enviarCorreo(); descomentar esto para enviar el correo con codigo hardcoded
  }
  
  cambiarContrasena(){ //Acá realizar la llamada y enviar los parámetros para validar el código
    this.Autenticacion.cambiarContrasena('imontes227@gmail.com','17443126','pico1234').subscribe(
      data=>{
        console.log(data[0][0]._resultado_out);
        if(data[0][0]._resultado_out===0){
          console.log('Cambio clave-> correcto,  codigo:',data[0][0]._resultado_out);
        }else{
          console.log('Cambio clave-> incorrecto,  codigo:', data[0][0]._resultado_out);
        }
      }
    )
  }

  enviarCorreo(nombres, correo, codigoOtp ){ //Enviar correo
    this.Autenticacion.enviarCorreo(nombres, correo, codigoOtp).subscribe(
      data=>{
        console.log(data);
       
        
      }
    )
  }

  crearCodigoOtp(mail, codigoOtp, idusuario){ //Enviar correo
    this.Autenticacion.crearCodigoOtp(mail, codigoOtp, idusuario).subscribe(
      data=>{
        console.log(data);
       
        
      }
    )
  }

  consultarDatosUsuario(mail){ //Enviar correo
    this.Autenticacion.consultarDatosUsuario(mail).subscribe(
      data=>{
        console.log(data);
       
        
      }
    )
  }
  
  registrarUsuario(){
    let id_usuario = 0;
    let run = this.usuarioFormCrear.run;
    let dv = this.usuarioFormCrear.dv;
    let pri_nom = this.usuarioFormCrear.pri_nom;
    let seg_nom = this.usuarioFormCrear.seg_nom;
    let pri_ap = this.usuarioFormCrear.pri_ap;
    let seg_ap = this.usuarioFormCrear.seg_ap;
    let direccion = this.usuarioFormCrear.direccion;
    let comuna = this.comuna2;
    let mail = this.usuarioFormCrear.mail;
    let password = this.usuarioFormCrear.password;
    let sexo = this.sexo2;
    let rol = this.rol;
    let estado = this.usuarioFormCrear.estado;

    if(run ==''|| dv ==''|| pri_nom =='' || pri_ap =='' || direccion =='' || mail=='' || password =='' ){
      this.presentToastWithOptions('Campos vacíos','Debe Completar todos los campos');
    }else{
      this.Autenticacion.registrarUsuario(id_usuario, run, dv, pri_nom, seg_nom, pri_ap, seg_ap, direccion, comuna, mail, password, sexo, rol, estado).subscribe(
        data=>{
          if(data[0][0]._respuesta_out ===0 ){
            this.alertaGenerica('Correcto!', 'El usuario '+run+ ' ha sido registrado correctamente.' );
            this.limpiarCampos();
            this.Router.navigate(['login']);
          }else if(data[0][0]._respuesta_out === -1 ){
            this.alertaGenerica('Error!', ' El mail o run ingresado ya se encuentra registrado.' );
          }else{
            this.alertaGenerica('Error!', ' Ha ocurrido un error, por favor intente nuevamente la operación.')
          }
          console.log(data[0][0]._respuesta_out);
        }
      )

    }
  }
 /************************************/

 listarComunas(){
  this.Autenticacion.listarComunas().subscribe(
    data =>{
      for(let elemento in data){
        this.listaComunas.push(data[elemento]);
      }
    }
    /*data=>{
      data.id_comuna.forEach(element => {
        
      });
    
      
    }
     */ 
  )
}
/**************************************/
  limpiarCampos(){
    this.usuarioFormCrear.run = '';
    this.usuarioFormCrear.dv ='';
    this.usuarioFormCrear.pri_nom = '';
    this.usuarioFormCrear.seg_nom ='';
    this.usuarioFormCrear.pri_ap = '';
    this.usuarioFormCrear.seg_ap = '';
    this.usuarioFormCrear.comuna ='';
    this.usuarioFormCrear.mail ='';
    this.usuarioFormCrear.rol ='';
    this.usuarioFormCrear.sexo='';
    this.usuarioFormCrear.direccion='';
    this.usuarioFormCrear.password='';
  };
/*********************************************************/
  async alertaGenerica(header, message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
    }
/**********************************************************/
  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Credenciales Inválidas',
  //     //subHeader: 'Subtitle',
  //     message: 'Usuario o contraseña inválidos, intente nuevamente.',
  //     buttons: ['OK']
  //   });
  //   await alert.present();
  //   const { role } = await alert.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  // }

  async presentToastWithOptions(header, message) {
    const toast = await this.toastController.create({
      message: message,
      icon: 'information-circle',
      position: 'bottom',
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
