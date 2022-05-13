import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { AutenticacionService } from '../services/autenticacion.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mensajeError: string;

  usuarioForm = {
    usuario: '',
    password: ''
  }
  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public navController: NavController,
    private toastController: ToastController,
    private Autenticacion: AutenticacionService,
    private Router: Router
  ) { }

  ngOnInit() {
  }

  validarUsuario() {
    let usuario= this.usuarioForm.usuario;
    let contrasena = this.usuarioForm.password;
    if(usuario=="" || contrasena==""){
      this.presentToastWithOptions('Campos vacíos','Debe ingresar un usuario y una contraseña.');
    } else{
      this.Autenticacion.validarLogin(usuario, contrasena).subscribe( data =>{
        console.log(data.id_usuario)
        if(data.id_usuario > 0){
          this.presentToast('Bienvenido!');
          this.navController.navigateRoot(['inicio']);
        }else{
          console.log('Login nok')
        }
      });
    }
    

  }
  mostrarAlerta() {
    this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Credenciales Inválidas',
      //subHeader: 'Subtitle',
      message: 'Usuario o contraseña inválidos, intente nuevamente.',
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

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


  
  async presentToast(message) {
    const toast = await this.toastController.create({
      position: 'bottom',
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
