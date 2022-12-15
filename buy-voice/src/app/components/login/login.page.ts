import { ModalGenericoComponent } from 'src/app/ui/modal-generico/modal-generico.component';
import { ManagerModal } from 'src/app/service/manager-modal.service';
import { NavController } from '@ionic/angular';
import { CompraVentaModel } from 'src/app/models/compra-venta.model';
import { Subscription } from 'rxjs';
import { ComercioService } from 'src/app/service/comercio.service';
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { NegocioModel } from 'src/app/models/negocio.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public model: {
    nombre: string;
    pass: string;
  }= {
    nombre: '', pass: ''
  };
  private _promesa: Subscription[];

  constructor(private _infoNegocio: NegocioModel, private _router: Router, private _comercio: ComercioService,
    private _managerModal: ManagerModal,
    private _navCtrl: NavController) { }

  ngOnInit() {
    // this._promesa = [];
    // this._promesa.push(this._comercio.getInventario().subscribe());
    this.model.nombre = 'fabian';
    this.model.pass = 'Admin';
  }

  errorPrincipal(){
    this._managerModal.configMessage('ERR-GENERIC');
    this._managerModal.configMessageDEBUG('Usuaio o contraseña incorrecta');
    this._managerModal.initConfigModal(ModalGenericoComponent, 'my-modal-generic-class', () => {
      this._router.navigate(['/']);
    });
  }

  setValue(target, campo){
    this.model[campo] = target.value;
  }

  logIn(){
    this._comercio.getInfoNegocio(this.model.nombre, this.model.pass).subscribe(data =>{
      if(data.status=='NOK'){
        this.errorPrincipal();
        return;
      }
      this._comercio.getInventario().subscribe(dta => {
        this._router.navigate(['menu-principal']);
      })
    });
  }

}
