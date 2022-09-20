import { map,take } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ProductoComunModel } from './../models/producto-comun.model';
/* eslint-disable @typescript-eslint/naming-convention */
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
    const method = (observer) =>{
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
            usuario.activo = us.nombre.toLowerCase()===nombreUsuario.toLowerCase();
            nuevaLista.push(usuario);
          });
          this._infoNegocio.usuarios = nuevaLista;
          observer.next({status: 'OK', message: ''});
        }
      , err => {
        console.log(err);
        observer.next({status: 'NOK', message: 'Se produjo un error'});
      });
    };
    return new Observable<any>(method);
  }

  getInventario(){
    const method = (observer) =>{
      this._firestore.getAllInventario(this._infoNegocio.id).subscribe(
        data => {
          this._listaInventario = [];
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
          observer.next({status: 'OK', message: ''});
        }, err => {
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error'});
        },
        ()=> console.log('comple')
      );
    };
    return new Observable<any>(method);
  }

  getVentas(){
    const method = (observer) => {
      const listaVentas = new Array<CompraVentaModel>();
      this._firestore.getAllVenta(this._infoNegocio.id).subscribe(
        data => {
          const llaves = Object.keys(data).filter(k => k !== 'id');
          llaves.forEach(k => {
            data[k].forEach( vnt => {
              const nuevaVnt = new CompraVentaModel();
              nuevaVnt.comerciante = this._infoNegocio.usuarios.find(usu => usu.id === vnt.id_usuario);
              nuevaVnt.fecha = vnt.fecha;
              nuevaVnt.totalVentaCompra = vnt.total_venta;
              nuevaVnt.totalVentaCompra = vnt.total_venta;
              nuevaVnt.estado = vnt.estado;
              const listaPr = new Array<ProductoComunModel>();
              vnt.detalle_productos.forEach(p => {
                const nuevoP = new ProductoComunModel();
                nuevoP.cantidad = p.cantidad;
                nuevoP.precioVentaCompra = p.precio_venta;
                nuevoP.unidadMedidaVenta = p.unidad_medida_venta;
                nuevoP.inventario = this._listaInventario.find(i => i.id == p.id_inventario);
                listaPr.push(nuevoP);
              });
              nuevaVnt.detalleProductos = listaPr;
              listaVentas.push(nuevaVnt);
            });
          });
          observer.next({status: 'OK', message: listaVentas});
        }, err => {
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error'});
        }
      );
    };
    return new Observable<any>(method);
  }

  getCompras(){
    const method = (observer) => {
      const listaCompras = new Array<CompraVentaModel>();
      this._firestore.getAllCompra(this._infoNegocio.id).subscribe(
        data => {
          const llaves = Object.keys(data).filter(k => k !== 'id');
          llaves.forEach(k => {
            data[k].forEach( vnt => {
              const nuevaVnt = new CompraVentaModel();
              nuevaVnt.comerciante = this._infoNegocio.usuarios.find(usu => usu.id === vnt.id_usuario);
              nuevaVnt.fecha = vnt.fecha;
              nuevaVnt.totalVentaCompra = vnt.total_compra;
              nuevaVnt.estado = vnt.estado;
              const listaPr = new Array<ProductoComunModel>();
              vnt.detalle_productos.forEach(p => {
                const nuevoP = new ProductoComunModel();
                nuevoP.cantidad = p.cantidad;
                nuevoP.precioVentaCompra = p.precio_compra;
                nuevoP.inventario = this._listaInventario.find(i => i.id == p.id_inventario);
                listaPr.push(nuevoP);
              });
              nuevaVnt.detalleProductos = listaPr;
              listaCompras.push(nuevaVnt);
            });
          });
          observer.next({status: 'OK', message: listaCompras});
        }, err => {
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error'});
        }
      );
    };
    return new Observable<any>(method);
  }

  generarCompra(nuevaCompra: CompraVentaModel) {
    const method = (observer) => {
      this._firestore.getAllCompra(this._infoNegocio.id).pipe(take(1)).subscribe(
        data => {
          const fechaActual = new Date();
          const mes = (fechaActual.getMonth()+1) < 10 ? `0${fechaActual.getMonth()+1}` : fechaActual.getMonth()+1;
          const dia = fechaActual.getUTCDate()  < 10 ? `0${fechaActual.getUTCDate()}` : fechaActual.getUTCDate();
          const anno = fechaActual.getFullYear();
          const stringFecha = `${dia}-${mes}-${anno}`;
          const diaIniciado = data[stringFecha];
          const objCompra = {
            total_compra: nuevaCompra.totalVentaCompra,
            id_usuario: nuevaCompra.comerciante.id,
            fecha: `${dia}/${mes}/${anno}`,
            estado: 'realizado',
            detalle_productos: nuevaCompra.detalleProductos.map(prod => ({
              cantidad: prod.cantidad,
              id_inventario: prod.inventario.id,
              precio_compra: prod.precioVentaCompra
            }))
          };
          const obj = !diaIniciado ? {[stringFecha]: [objCompra] } : {[stringFecha]: [...diaIniciado, objCompra] };
          this._firestore.newPurchase(obj,this._infoNegocio.id).subscribe(
            () => observer.next({status: 'OK', message: ''})
            , err => {
              console.log(err);
              observer.next({status: 'NOK', message: 'Se produjo un error'});
            }
          );
        }, err =>{
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error'});
        }
      );
    };
    return new Observable(method);
  }

  generarVenta(nuevaVenta: CompraVentaModel) {
    const method = (observer) => {
      this._firestore.getAllVenta(this._infoNegocio.id).pipe(take(1)).subscribe(
        data => {
          const fechaActual = new Date();
          const mes = (fechaActual.getMonth()+1) < 10 ? `0${fechaActual.getMonth()+1}` : fechaActual.getMonth()+1;
          const dia = fechaActual.getUTCDate()  < 10 ? `0${fechaActual.getUTCDate()}` : fechaActual.getUTCDate();
          const anno = fechaActual.getFullYear();
          const stringFecha = `${dia}-${mes}-${anno}`;
          const diaIniciado = data[stringFecha];
          const objCompra = {
            total_venta: nuevaVenta.totalVentaCompra,
            id_usuario: nuevaVenta.comerciante.id,
            fecha: `${dia}/${mes}/${anno}`,
            estado: 'realizado',
            detalle_productos: nuevaVenta.detalleProductos.map(prod => ({
              cantidad: prod.cantidad,
              id_inventario: prod.inventario.id,
              precio_venta: prod.precioVentaCompra,
              unidad_medida_venta: prod.unidadMedidaVenta
            }))
          };
          const obj = !diaIniciado ? {[stringFecha]: [objCompra] } : {[stringFecha]: [...diaIniciado, objCompra] };
          this._firestore.newSale(obj,this._infoNegocio.id).subscribe(
            () => observer.next({status: 'OK', message: ''})
            , err => {
              console.log(err);
              observer.next({status: 'NOK', message: 'Se produjo un error'});
            }
          );
        }, err =>{
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error'});
        }
      );
    };
    return new Observable(method);
  }
}
