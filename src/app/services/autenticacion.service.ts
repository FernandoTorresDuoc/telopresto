import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import { Respuesta } from '../interfaces/Respuesta';
import { map, withLatestFrom } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private http: HttpClient,  public alertController:AlertController, public navController: NavController) { }

  rutaBase: string = 'http://localhost:3001/';
  public usuarioAuth : string;
  public claveAuth : string;

  validarLogin(usuario, contrasena) {
    return this.http.get<Usuario>(this.rutaBase + 'validarUsuario/run=' + usuario + '&pass=' + contrasena)
      .pipe( map(auth => {
        if(auth !== undefined){
          console.log(usuario + contrasena);
          this.usuarioAuth=usuario;
          this.claveAuth=contrasena;
       }
      return auth;
     }));
    }
}
