import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-pass',
  templateUrl: './modificar-pass.page.html',
  styleUrls: ['./modificar-pass.page.scss'],
})
export class ModificarPassPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  contrasenaActualizada(){
    this.router.navigate(['login'])
  }

}
