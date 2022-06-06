import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { AutenticacionService } from '../services/autenticacion.service';
import { NavigationExtras, Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
 

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
    private router: Router,
  ) { }

  ngOnInit() {
  }
  

  validarUsuario() {
    let usuario= this.usuarioForm.usuario;
    let contrasena = this.usuarioForm.password;
    if(usuario=="" || contrasena=="" ){
      this.presentToast('Debe ingresar un usuario y una contraseña.');
    } else{
      this.Autenticacion.validarLogin(usuario, contrasena).subscribe( data =>{
        // console.log(data);
        // console.log(data.id_usuario)
        //console.log(data[0].rol)
        if (data[0] ==null){
          this.presentToast('Las credenciales son incorrectas, por favor reintente');
        }
        else{
          if(data[0].id_usuario > 0 && data[0].rol == "Arrendatario"){

            this.presentToast('Bienvenido!');
            this.navController.navigateRoot(['inicio']);
          }else if (data[0].id_usuario > 0 && data[0].rol == "Arrendador"){
            this.presentToast('Bienvenido!');
            this.navController.navigateRoot(['inicio-arrendador']);
  
          }else if(data[0].id_usuario === null ){
            console.log('Login nok')
          }
        }
        
      });
    }   
    
  }

  mostrarFormulario(){
    this.router.navigate(['registrar']);
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
      header: 'Atención!',
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
  // async mostrarFormulario() {
  //   const alert = await this.alertController.create({
  //     header: 'Nuevo Usuario',
  //     inputs: [
  //       {
  //         name: 'txt_rut',
  //         type: 'text',
  //         placeholder: 'Ingrese Rut'
  //       },
  //       {
  //         name: 'txt_dv',
  //         type: 'text',
  //         placeholder: 'Ingrese Dígito Verificador'
  //       },
  //       {
  //         name: 'txt_pri_nom',
  //         type: 'text',
  //         placeholder: 'Ingrese Primer Nombre'
  //       },
  //       {
  //         name: 'txt_seg_nom',
  //         type: 'text',
  //         placeholder: 'Ingrese Segundo Nombre'
  //       },
  //       {
  //         name: 'txt_pri_ap',
  //         type: 'text',
  //         placeholder: 'Ingrese Primer Apellido'
  //       },
  //       {
  //         name: 'txt_seg_ap',
  //         type: 'text',
  //         placeholder: 'Ingrese Segundo Apellido'
  //       },
  //       {
  //         name: 'txt_direccion',
  //         type: 'text',
  //         placeholder: 'Ingrese Dirección'
  //       },
  //       {
  //         name: 'txt_comuna',
  //         type: 'text',
  //         placeholder: 'Ingrese Comuna'
  //       },
  //       {
  //         name: 'txt_contrasena',
  //         // type: 'password', RECORDAR DESCOMENTAR
  //         type: 'text', //SOLO PARA VISUALIZAR EN MODO PRUEBA
  //         placeholder: 'Ingrese Contraseña'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: 'Crear Usuario',
  //         handler: (data) => {
  //           // this.crearUsuario(data.txt_usuario, data.txt_contrasena);
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  recuperarContrasena(){
    this.router.navigate(['/recuperar']);
  }

}
