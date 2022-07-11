import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import { Respuesta } from '../interfaces/Respuesta';
import { map, withLatestFrom } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';
import { Comuna } from '../interfaces/comuna';
import { Marker } from '../interfaces/marker';
import { Foto } from '../interfaces/foto';
import { Servicio } from '../interfaces/servicio';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  markers: Marker[] = [
    
  ];

  constructor(private http: HttpClient,  public alertController:AlertController, public navController: NavController) { }

  rutaBase: string = 'http://localhost:3001/';
  // rutaBase: string = 'http://34.125.116.134:3001/';
  public usuarioAuth : string;
  public claveAuth : string;
  public idUsuarioLogueado: number;
  public mail: string='';
  public codigoOtp: string='';
  public slideSeleccionada :number = 0;
  public idUsuarioArrendador: number;
  public marker:Marker;

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
  // uploadFile(id_servicio, file, primario){
  //   let urlApi = this.rutaBase + 'insertarFoto/';
  //   return this.http.post(urlApi, {id_servicio, file, primario});
  // }
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

  obtenerServicios(){
    return this.http.post<Marker>(this.rutaBase+'obtenerServicios/',{})
  }

  obtenerImagenes(idServicio){
    return this.http.post(this.rutaBase+'consultarFoto/',{idServicio})
  }

  obtenerImagenPrimaria(idServicio){
    return this.http.post(this.rutaBase+'consultarFotoPrimaria/',{idServicio})
  }
  crearServicio(categoria, descripcion, direccion, diaIni, diaTer, horaIni, horaTer, precioIn, latitud, longitud, idUsuario, idComuna){
    return this.http.post(this.rutaBase + 'crearServicio/', {categoria, descripcion, direccion, diaIni, diaTer, horaIni, horaTer, precioIn, latitud, longitud, idUsuario, idComuna})
  }

  uploadFile(formData, ) {
    let urlAPI = 'http://localhost:3001/api/upload';
     return this.http.post(urlAPI, formData );
  }
  insertarFoto(id_servicio, foto, primario, size){
    return this.http.post(this.rutaBase + 'insertarFoto/', {id_servicio, foto, primario, size} )
  }

  crearTransaccion(monto, idServicio, idusuario){
    return this.http.post(this.rutaBase + 'crearTransaccion/', {monto, idServicio, idusuario} )
  }

  cambiarEstadoTransaccion(letra, id_transaccion){
    return this.http.post(this.rutaBase + 'cambiarEstadoTransaccion/',{letra, id_transaccion})
  }

  getUsuario(idUsuario){
    return this.http.post<Usuario>(this.rutaBase + 'getUsuario/', {idUsuario})
  }

  recuperarServicio(idServicio){
    return this.http.post<Servicio>(this.rutaBase + 'recuperarServicio/', {idServicio})
  }


}


