/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { FirestoreService } from '../dataBase/firestore.service';
import { NegocioModel } from '../models/negocio.model';
import { UsuarioModel } from '../models/usuario.model';
import { InventarioModel } from '../models/inventario.model';
import { CompraVentaModel } from '../models/compra-venta.model';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {

  private _listaInventario: Array<InventarioModel> = new Array<InventarioModel>();

  constructor(private _firestore: FirestoreService, private _infoNegocio: NegocioModel){}

  getInfoNegocio(nombreUsuario: string, clave: string) {
    this._firestore.getAllNegocio().subscribe(
      data => {
        const negocio = data.find(info =>
          info.usuarios.find(us =>
            us.nombre.toLowerCase()===nombreUsuario.toLowerCase()
            && us.clave===clave
          )
        );
        this._infoNegocio.id = negocio.id;
        this._infoNegocio.nombre = negocio.nombre;
        const nuevaLista = new Array<UsuarioModel>();
        negocio.usuarios.forEach(us => {
          const usuario = new UsuarioModel();
          usuario.nombre = us.nombre;
          usuario.perfil = us.perfil;
          usuario.id = us.id;
          nuevaLista.push(usuario);
        });
        this._infoNegocio.usuario = nuevaLista;
      }
    , err => console.log(err));
  }

  getInventario(){
    this._firestore.getAllInventario(this._infoNegocio.id).subscribe(
      data => {
        data.productos.forEach((prod, indx) => {
          const nuevo = new InventarioModel();
          nuevo.cantidadDisponible = prod.cantidad_disponible;
          nuevo.cantidadPerdida = prod.cantidad_perdida;
          nuevo.id = prod.id;
          nuevo.nombre = prod.nombre;
          nuevo.precioVentaActual = prod.precio_venta_actual;
          nuevo.unidadMedida = prod.unidad_medida;
          nuevo.unidadMedidaVenta = prod.unidad_medida_venta;
          this._listaInventario.push(nuevo);
        });
      }, err => console.log(err)
    );
  }

  getVentas(){
    const listaVentas = new Array<CompraVentaModel>();
    this._firestore.getAllVenta(this._infoNegocio.id).subscribe(
      data => {
        const llaves = Object.keys(data).filter(k => k !== 'id');
        llaves.forEach(k => {
          data[k].forEach( vnt => {
            const nuevaVnt = new CompraVentaModel();
            nuevaVnt.comerciante = this._infoNegocio.usuario.find(usu => usu.id === vnt.id_usuario);
            nuevaVnt.fecha = new Date(vnt.fecha);
            nuevaVnt.totalVenta = vnt.total_venta;
            listaVentas.push(nuevaVnt);
          });
        });
      }, err => console.log(err)
    );
    return listaVentas;
  }
}
