import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AutenticacionService } from '../services/autenticacion.service';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss'],
})
export class ModalComponentComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
              private autenticationService: AutenticacionService) { }

  ngOnInit() {
    this.consultarFotos();
  }
  listaFotos: string[] = [];
  close(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


  async consultarFotos(){
    this.autenticationService.obtenerImagenes(this.autenticationService.slideSeleccionada).subscribe(data=>{
      for(let elemento in data){
        console.log(elemento);
        this.listaFotos.push(data[elemento])
        console.log(this.listaFotos);
      }
     
      
    })
  }
}
