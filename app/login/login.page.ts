import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  modeloUsuario: string;
  modeloContrasena: string;
  mensajeError: string;
  usuario: string ='G';
  password: string ='V';
  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public navController: NavController,
    private toastConstroller: ToastController
  ) { }

  ngOnInit() {
  }

  validarUsuario() {
    if (this.modeloUsuario === this.usuario && this.modeloContrasena === this.password) {
      this.navController.navigateRoot('/tabs'/** , { queryParams: { 'nombre': 'Giovanni' } }*/);
      // {'nombre': this.modeloNombre} -- Entrega un parámetro de un objeto
      this.mensajeError = '';
    } else {
      //console.log('Credenciales Invalidas')
      this.mostrarAlerta();
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
}
