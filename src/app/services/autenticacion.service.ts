import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import { Respuesta } from '../interfaces/Respuesta';
import { map, withLatestFrom } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';
import { Comuna } from '../interfaces/comuna';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private http: HttpClient,  public alertController:AlertController, public navController: NavController) { }

  //rutaBase: string = 'http://localhost:3001/';
  rutaBase: string = 'http://34.125.116.134:3001/';
  public usuarioAuth : string;
  public claveAuth : string;

  public mail: string='';
  public codigoOtp: string='';
  
  

  // validarLogin(usuario, contrasena) {
  //   return this.http.get<Usuario>(this.rutaBase + 'validarUsuario/run=' + usuario + '&pass=' + contrasena)
  //     .pipe( map(auth => {
  //       if(auth !== undefined){
  //         console.log(usuario + contrasena);
  //         this.usuarioAuth=usuario;
  //         this.claveAuth=contrasena;
  //      }
  //     return auth;
  //    }));
  //   }

  validarLogin(usuario, contrasena) {
    return this.http.get<Usuario>(this.rutaBase + 'validarUsuario/run=' + usuario + '&pass=' + contrasena);
    }

  registrarUsuario( id_usuario, rut, dv, pri_nom, seg_nom, pri_ap, seg_ap,  direccion, id_comuna, mail, password, sexo, rol, estado){
     return this.http.post(this.rutaBase+ 'registrar',{id_usuario, rut, dv, pri_nom, seg_nom, pri_ap, seg_ap, direccion, id_comuna, mail, password, sexo, rol, estado});
  }  

  cambiarContrasena( mail, codigoOtp, nuevaClave){
    return this.http.post(this.rutaBase+ 'cambiarContrasena/',{mail, codigoOtp, nuevaClave})
  }  

  listarComunas(){
    return this.http.get<Comuna>(this.rutaBase+ 'comuna')
  } 

  enviarCorreo(nombres, mail, codigoOtp){
    return this.http.post(this.rutaBase+ 'send-email/',{nombres, mail, codigoOtp})
  }

  crearCodigoOtp(mail, run, idusuario){
    return this.http.post(this.rutaBase+ 'crearCodigo/',{mail, run, idusuario})
  }

  consultarDatosUsuario(mail){
    return this.http.post(this.rutaBase+ 'consultarDatosUsuario/',{mail})
  }

  validarCodigo(codigoOtp, mail, idusuario){
    return this.http.post(this.rutaBase+ 'validarCodigo/',{codigoOtp, mail, idusuario})
  }

}
