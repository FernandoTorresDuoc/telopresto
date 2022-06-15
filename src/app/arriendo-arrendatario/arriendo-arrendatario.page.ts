import { Component, OnInit } from '@angular/core';
import { Marker } from '../interfaces/marker';
import { AutenticacionService } from '../services/autenticacion.service';

@Component({
  selector: 'app-arriendo-arrendatario',
  templateUrl: './arriendo-arrendatario.page.html',
  styleUrls: ['./arriendo-arrendatario.page.scss'],
})
export class ArriendoArrendatarioPage implements OnInit {

  constructor(private Autenticacion: AutenticacionService) {
    this.listarServicios();
   }

  markers: Marker[] = [
    
  ];

  ngOnInit() {
  }

  listarServicios(){
    this.markers = this.Autenticacion.markers;
    console.log(this.Autenticacion.markers);
    
  }

}
