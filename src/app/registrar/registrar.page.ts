import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../services/autenticacion.service';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  
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
    private router: Router) { }

  ngOnInit() {
    //this.cambiarContrasena();
  }
  /*
  cambiarContrasena(){ //Acá realizar la llamada y enviar los parámetros para validar el código
    this.Autenticacion.cambiarContrasena('imontes227@gmail.com','1023','nuevapassword').subscribe(
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
  */
  registrarUsuario(){
    let id_usuario = 0;
    let run = this.usuarioFormCrear.run;
    console.log(run);
    let dv = this.usuarioFormCrear.dv;
    let pri_nom = this.usuarioFormCrear.pri_nom;
    let seg_nom = this.usuarioFormCrear.seg_nom;
    let pri_ap = this.usuarioFormCrear.pri_ap;
    let seg_ap = this.usuarioFormCrear.seg_ap;
    let direccion = this.usuarioFormCrear.direccion;
    let comuna = this.usuarioFormCrear.comuna;
    let mail = this.usuarioFormCrear.mail;
    let password = this.usuarioFormCrear.password;
    let sexo = this.usuarioFormCrear.sexo;
    let rol = this.usuarioFormCrear.rol;
    let estado = this.usuarioFormCrear.estado;

    if(run ==''|| dv ==''|| pri_nom =='' || pri_ap =='' || direccion =='' || comuna =='' || mail=='' || password =='' || sexo ==''|| rol==''){
      this.presentToastWithOptions('Campos vacíos','Debe Completar todos los campos');
    }else{
      this.Autenticacion.registrarUsuario(id_usuario, run, dv, pri_nom, seg_nom, pri_ap, seg_ap, direccion, comuna, mail, password, sexo, rol, estado).subscribe(
        data=>{
        }
      )
      this.router.navigate(['login'])

    }
    

  }

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
