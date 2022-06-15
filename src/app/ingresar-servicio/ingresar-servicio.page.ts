import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Comuna } from '../interfaces/comuna';
import { AutenticacionService } from '../services/autenticacion.service';

@Component({
  selector: 'app-ingresar-servicio',
  templateUrl: './ingresar-servicio.page.html',
  styleUrls: ['./ingresar-servicio.page.scss'],
})
export class IngresarServicioPage implements OnInit {

  servicioForm = {
    categoria:'',
    descripcion:'',
    direccion:'',
    comuna:'',
    diaInicio:'',
    diaTermino:'',
    horaInicio:'',
    horaTermino:'',
    precio:'',
    lat:0,
    lon:0,
    foto: File,

  }
  uploadedFiles:Array <File>;
  listaComunas: Comuna[] =[];
  idServicio : number;
  nombreArchivo : String;
  tamanioArchivo : number;
  constructor(private Autenticacion:AutenticacionService,
              private alertController: AlertController,
              private toastController:ToastController,
              public navController: NavController) { 

    }

  ngOnInit() {
    this.listarComunas();
  }


  
  async upload() {
    let formData = new FormData();
    if(this.servicioForm.categoria=="" || this.servicioForm.descripcion =="" || this.servicioForm.direccion==""){
        this.presentToastWithOptions('Error','Los campos no pueden estar vacíos');
    }
    else{
      for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
      }
       this.Autenticacion.uploadFile(formData).subscribe(res=> { //acá se sube la foto al servidor
        console.log('response received is ', res);
        this.tamanioArchivo = res["size"];
        this.nombreArchivo = res["name"]
        if(this.tamanioArchivo >0){ //si el tamaño del archivo es válido, sigue con el flujo
            //aca creo el servicio
              this.Autenticacion.crearServicio(this.servicioForm.categoria, this.servicioForm.descripcion, this.servicioForm.direccion, this.servicioForm.diaInicio,
                                            this.servicioForm.diaTermino, this.servicioForm.horaInicio, this.servicioForm.horaTermino, this.servicioForm.precio, this.servicioForm.lat, this.servicioForm.lon, 
                                            localStorage.getItem('userLogged'),this.servicioForm.comuna).subscribe(data =>{
                for(let elemento in data){
                  console.log('data de crear servicio ->',data);
                  if(data[0][0]._resultado_out > 0){
          
                    this.idServicio = data[0][0]._resultado_out; //recupero el id del servicio
          
                    console.log('Servicio insertado correctamente')
                    console.log('IdServicio ->', this.idServicio)
                   
                  }
              }
              //aca insertamos la foto guardada anteriormente
              this.Autenticacion.insertarFoto(this.idServicio, this.nombreArchivo , 1 ,this.tamanioArchivo  ).subscribe(resultado=>{
                console.log('Insertando imagen-->', resultado)
                this.presentToastWithOptions('Exito!','Servicio creado correctamente!')
                if(localStorage.getItem('rol') ==='Arrendador'){
                  this.navController.navigateRoot(['inicio-arrendador']);
                }else if(localStorage.getItem('rol') ==='Arrendatario'){
                  this.navController.navigateRoot(['inicio']);
                }
                
              });
            }, err =>{
                this.presentToastWithOptions('Error!','Algo salió mal :(')
              })
        }
      });

      
    }
    //this.Autenticacion.insertarFoto(this.idServicio, res['fileName'], 1 , res['size'] );
  
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
    console.log(this.uploadedFiles);
  }

 
    
  async presentToast(message) {
    const toast = await this.toastController.create({
      position: 'bottom',
      message: message,
      duration: 2000
    });
    toast.present();
  }
  
  async presentAlert(subtitulo, message) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Detalle',
      subHeader: subtitulo,
      message: message,
      buttons: [{
        text: 'Ok',
        cssClass: 'my-custom-class',
        handler: ()=>{
          
        }
      }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  listarComunas(){
    this.Autenticacion.listarComunas().subscribe(
      data =>{
        for(let elemento in data){
          this.listaComunas.push(data[elemento]);
          console.log(data[elemento]);
        }
      }
      /*data=>{
        data.id_comuna.forEach(element => {
          
        });
      
        
      }
       */ 
    )
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


}
