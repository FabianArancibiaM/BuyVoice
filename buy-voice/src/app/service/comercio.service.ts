import { map,take } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { ProductoComunModel } from './../models/producto-comun.model';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { FirestoreService } from '../dataBase/firestore.service';
import { NegocioModel } from '../models/negocio.model';
import { UsuarioModel } from '../models/usuario.model';
import { InventarioModel } from '../models/inventario.model';
import { CompraVentaModel } from '../models/compra-venta.model';
import { DataManagementService } from './data-management.service';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {

  private _listaInventario: Array<InventarioModel> = new Array<InventarioModel>();

  constructor(
    private _firestore: FirestoreService,
    private _infoNegocio: NegocioModel
  ){}

  toDateFormat(fecha: string) {
    const f = fecha.split('-');
    return new Date(`${f[1]}/${f[0]}/${f[2]}`);
  }

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
        observer.next({status: 'NOK', message: 'Se produjo un error', err});
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
            nuevo.fechaCompra = prod.fecha_compra;
            this._listaInventario.push(nuevo);
          });
          observer.next({status: 'OK', message: this._listaInventario});
        }, err => {
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error', err});
        },
        ()=> console.log('comple')
      );
    };
    return new Observable<any>(method);
  }

  // COMPRAS

  getCompras(){
    const method = (observer) => {
      const listaCompras = new Array<CompraVentaModel>();
      this._firestore.getAllCompra(this._infoNegocio.id).subscribe(
        data => {
          let llaves = Object.keys(data).filter(k => k !== 'id');
          llaves = llaves.sort((a,b) => this.toDateFormat(b).getTime() - this.toDateFormat(a).getTime() );
          llaves.forEach(k => {
            data[k].forEach( vnt => {
              const nuevaVnt = new CompraVentaModel();
              nuevaVnt.comerciante = this._infoNegocio.usuarios.find(usu => usu.id === vnt.id_usuario);
              nuevaVnt.fecha = vnt.fecha;
              nuevaVnt.id = vnt.id_compra;
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
          observer.next({status: 'NOK', message: 'Se produjo un error', err});
        }
      );
    };
    return new Observable<any>(method);
  }

  generarCompra(nuevaCompra: CompraVentaModel) {
    const method = (observer) => {
      this._firestore.getAllCompra(this._infoNegocio.id).pipe(take(1)).subscribe(
        data => {
          this._firestore.getAllInventario(this._infoNegocio.id).pipe(take(1)).subscribe( invProd => {

            const fechaActual = new Date();
            const mes = (fechaActual.getMonth()+1) < 10 ? `0${fechaActual.getMonth()+1}` : fechaActual.getMonth()+1;
            const dia = fechaActual.getUTCDate()  < 10 ? `0${fechaActual.getUTCDate()}` : fechaActual.getUTCDate();
            const anno = fechaActual.getFullYear();
            const stringFecha = `${dia}-${mes}-${anno}`;
            const diaIniciado = data[stringFecha];
            let idVentas = 0;
            if(!diaIniciado){
              idVentas = 1;
            } else {
              idVentas = diaIniciado.length > 0 ? diaIniciado[diaIniciado.length-1].id_compra + 1 : 1;
            }
            const objCompra = {
              id_compra: idVentas,
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

            nuevaCompra.detalleProductos.forEach( p => {
              const invProdSelect = invProd.productos.find( x => x.nombre === p.inventario.nombre);
              if(invProdSelect){
                invProdSelect.cantidad_disponible = Number(invProdSelect.cantidad_disponible) + Number(p.cantidad);
                if(invProdSelect.fecha_compra.length === 10){
                  invProdSelect.fecha_compra = [ objCompra.fecha,
                    invProdSelect.fecha_compra[0], invProdSelect.fecha_compra[1], invProdSelect.fecha_compra[2],
                    invProdSelect.fecha_compra[3], invProdSelect.fecha_compra[4], invProdSelect.fecha_compra[5],
                    invProdSelect.fecha_compra[6], invProdSelect.fecha_compra[7], invProdSelect.fecha_compra[8]];
                } else {
                  invProdSelect.fecha_compra = [objCompra.fecha, ...invProdSelect.fecha_compra];
                }
              } else {
                const newInvent = {
                  cantidad_disponible: p.cantidad,
                  cantidad_perdida: 0,
                  fecha_compra: [objCompra.fecha],
                  id: invProd.productos.length + 1,
                  nombre: p.inventario.nombre,
                  precio_venta_actual: 0,
                  unidad_medida: p.inventario.unidadMedida,
                  unidad_medida_venta: ''
                };
                invProd.productos = [newInvent, ...invProd.productos];
              }
            });

            this._firestore.updateInventario(invProd, this._infoNegocio.id).subscribe(
              result => {
                this._firestore.newPurchase(obj,this._infoNegocio.id).subscribe(
                  () => observer.next({status: 'OK', message: ''})
                  , err => {
                    console.log(err);
                    observer.next({status: 'NOK', message: 'Se produjo un error', err});
                  }
                );
              },
              err => {
                console.log(err);
                observer.next({status: 'NOK', message: 'Se produjo un error', err});
              }
            );
          });
        }, err =>{
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error', err});
        }
      );
    };
    return new Observable(method);
  }

  updateCompra(management: DataManagementService){
    const method = (observer) => {
      this._firestore.getAllCompra(this._infoNegocio.id).pipe(take(1)).subscribe(
        data => {
          const fecha = management.selectedTransaction.fecha.replace('/','-').replace('/','-');
          const trxBD = data[fecha]
            .find(trx => trx.id_compra === management.selectedTransaction.id)
            .detalle_productos[management.indexProductSelected];
          let cantProd = 0;
          const updateCant =  { amountPrev: management.selectedProduct.cantidad, amountNext: trxBD.cantidad};
          if(
              management.selectedProduct.cantidad!==trxBD.cantidad
              || management.selectedProduct.precioVentaCompra!==trxBD.precio_compra
            ){
            data[fecha]
              .find(trx => trx.id_compra === management.selectedTransaction.id)
              .detalle_productos[management.indexProductSelected] = {
                cantidad: management.selectedProduct.cantidad,
                id_inventario: management.selectedProduct.inventario.id,
                precio_compra: management.selectedProduct.precioVentaCompra,
              };
            let suma = 0;
            data[fecha].find(trx => trx.id_compra === management.selectedTransaction.id).detalle_productos.forEach(prd => {
                  cantProd = cantProd + prd.cantidad;
                  suma = suma + (prd.cantidad * prd.precio_compra);
                });
            data[fecha].find(trx => trx.id_compra === management.selectedTransaction.id).total_compra = suma;
          }

          this._firestore.updateCompra(data,this._infoNegocio.id ).subscribe( dta => {
            this._firestore.getAllInventario(this._infoNegocio.id).pipe(take(1)).subscribe(dataInv => {
              const invSelec = dataInv.productos.find(inv => inv.id === management.selectedProduct.inventario.id);
              if(invSelec.nombre !== management.selectedProduct.inventario.nombre){
                invSelec.nombre = management.selectedProduct.inventario.nombre;
                invSelec.cantidad_disponible = (invSelec.cantidad_disponible - updateCant.amountPrev) + updateCant.amountNext;
                this._firestore.updateInventario(dataInv, this._infoNegocio.id).subscribe(
                  result => observer.next({status: 'OK', message: ''}), err => {
                    console.log(err);
                    observer.next({status: 'NOK', message: 'Se produjo un error', err});
                  }
                );
              } else {
                observer.next({status: 'OK', message: ''});
              }
            });
          }, err => {
            console.log(err);
            observer.next({status: 'NOK', message: 'Se produjo un error', err});
          });
        }, err =>{
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error', err});
        }
      );
    };
    return new Observable(method);
  }

  totalCancellationPurchaseCompra(management: DataManagementService){
    const method = (observer) => {
      this._firestore.getAllCompra(this._infoNegocio.id).pipe(take(1)).subscribe(
        data => {
          const fecha = management.selectedTransaction.fecha.replace('/','-').replace('/','-');
          const newData = data[fecha].find(trx => trx.id_compra === management.selectedTransaction.id);
          this._firestore.getAllInventario(this._infoNegocio.id).pipe(take(1)).subscribe( invProd => {
            newData.detalle_productos.forEach( detProd => {
              const search = invProd.productos.find( x => x.id === detProd.id_inventario);
              search.cantidad_disponible = search.cantidad_disponible - detProd.cantidad;
              search.fecha_compra = search.fecha_compra.filter(x=> x !== management.selectedTransaction.fecha);
            });
            this._firestore.updateInventario(invProd, this._infoNegocio.id).subscribe(
              result => {
                data[fecha] = data[fecha].filter(trx => trx.id_compra !== management.selectedTransaction.id);
                this._firestore.updateCompra(data,this._infoNegocio.id ).subscribe( dta => {
                  observer.next({status: 'OK', message: ''});
                }, err => {
                  console.log(err);
                  observer.next({status: 'NOK', message: 'Se produjo un error', err});
                });
              }, err => {
                console.log(err);
                observer.next({status: 'NOK', message: 'Se produjo un error', err});
              });
          });
        }, err =>{
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error', err});
        }
      );
    };
    return new Observable(method);
  }

  partialCancellationPurchaseCompra(management: DataManagementService){
    const method = (observer) => {
      this._firestore.getAllCompra(this._infoNegocio.id).pipe(take(1)).subscribe(
        data => {
          const fecha = management.selectedTransaction.fecha.replace('/','-').replace('/','-');
          const newData = data[fecha].find(trx => trx.id_compra === management.selectedTransaction.id);

          this._firestore.getAllInventario(this._infoNegocio.id).pipe(take(1)).subscribe( invProd => {

            const searchProd = newData.detalle_productos.find( x => x.id_inventario === management.selectedProduct.inventario.id);
            newData.detalle_productos = newData.detalle_productos.filter(x => x.id_inventario !== management.selectedProduct.inventario.id);
            newData.total_compra = newData.total_compra - (searchProd.cantidad * searchProd.precio_compra);

            const invProdSelect = invProd.productos.find( x => x.id === management.selectedProduct.inventario.id);
            invProdSelect.fecha_compra = invProdSelect.fecha_compra.filter(x => x !== management.selectedTransaction.fecha);
            invProdSelect.cantidad_disponible = (Number(invProdSelect.cantidad_disponible) -  searchProd.cantidad).toString();
            invProdSelect.fecha_compra = invProdSelect.fecha_compra.filter(x=> x !== management.selectedTransaction.fecha);

            this._firestore.updateInventario(invProd, this._infoNegocio.id).subscribe(
              result => {
                this._firestore.updateCompra(data,this._infoNegocio.id ).subscribe( dta => {
                    observer.next({status: 'OK', message: ''});
                  },
                  err => {
                    console.log(err);
                    observer.next({status: 'NOK', message: 'Se produjo un error', err});
                  }
                );
              },
              err => {
                console.log(err);
                observer.next({status: 'NOK', message: 'Se produjo un error', err});
              }
            );
          });

        }, err =>{
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error', err});
        }
      );
    };
    return new Observable(method);
  }

  // VENTAS

  getVentas(){
    
    const method = (observer) => {
      const listaVentas = new Array<CompraVentaModel>();
      this._firestore.getAllVenta(this._infoNegocio.id).subscribe(
        data => {
          let llaves = Object.keys(data).filter(k => k !== 'id');
          llaves = llaves.sort((a,b) => this.toDateFormat(b).getTime() - this.toDateFormat(a).getTime() );
          llaves.forEach(k => {
            data[k].forEach( vnt => {
              if(vnt.estado !== 'ANULADO'){
                const nuevaVnt = new CompraVentaModel();
                nuevaVnt.comerciante = this._infoNegocio.usuarios.find(usu => usu.id === vnt.id_usuario);
                nuevaVnt.fecha = vnt.fecha;
                nuevaVnt.id = vnt.id_venta;
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
              }
            });
          });
          observer.next({status: 'OK', message: listaVentas});
        }, err => {
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error', err});
        }
      );
    };
    return new Observable<any>(method);
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
          let idVentas = 0;
          if(!diaIniciado){
            idVentas = 1;
          } else {
            idVentas = diaIniciado.length > 0 ? diaIniciado[diaIniciado.length-1].id_venta + 1 : 1;
          }
          const objCompra = {
            id_venta: idVentas,
            total_venta: nuevaVenta.totalVentaCompra,
            id_usuario: nuevaVenta.comerciante.id,
            fecha: `${dia}/${mes}/${anno}`,
            estado: 'realizado',
            detalle_productos: nuevaVenta.detalleProductos.map(prod => ({
              cantidad: prod.cantidad,
              id_inventario: prod.inventario.id,
              precio_venta: prod.precioVentaCompra,
              unidad_medida_venta: prod.unidadMedidaVenta ? prod.unidadMedidaVenta : ''
            }))
          };
          let obj;
          if(!diaIniciado){
            obj = {...data, [stringFecha]: [objCompra] };
          } else {
            data[stringFecha] = [...diaIniciado, objCompra];
            obj = data;
          }
          this._firestore.newSale(obj,this._infoNegocio.id).subscribe(
            () => observer.next({status: 'OK', message: ''})
            , err => {
              console.log(err);
              observer.next({status: 'NOK', message: 'Se produjo un error', err});
            }
          );
        }, err =>{
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error', err});
        }
      );
    };
    return new Observable(method);
  }

  updateVenta(management: DataManagementService){
    const method = (observer) => {
      this._firestore.getAllVenta(this._infoNegocio.id).pipe(take(1)).subscribe(
        data => {
          const fecha = management.selectedTransaction.fecha.replace('/','-').replace('/','-');
          const trxBD = data[fecha]
            .find(trx => trx.id_venta === management.selectedTransaction.id)
            .detalle_productos[management.indexProductSelected];
          let cantProd = 0;
          const updateCant =  { amountPrev: management.selectedProduct.cantidad, amountNext: trxBD.cantidad};
          if(
              management.selectedProduct.cantidad!==trxBD.cantidad
              || management.selectedProduct.precioVentaCompra!==trxBD.precio_compra
            ){
            data[fecha]
              .find(trx => trx.id_venta === management.selectedTransaction.id)
              .detalle_productos[management.indexProductSelected] = {
                cantidad: management.selectedProduct.cantidad,
                id_inventario: management.selectedProduct.inventario.id,
                precio_venta: management.selectedProduct.precioVentaCompra,
              };
            let suma = 0;
            data[fecha].find(trx => trx.id_venta === management.selectedTransaction.id).detalle_productos.forEach(prd => {
                  cantProd = cantProd + prd.cantidad;
                  suma = suma + (prd.cantidad * prd.precio_venta);
                });
            data[fecha].find(trx => trx.id_venta === management.selectedTransaction.id).total_venta = suma;
          }

          this._firestore.updateVentas(data,this._infoNegocio.id ).subscribe( dta => {
            observer.next({status: 'OK', message: ''});
          }, err => {
            console.log(err);
            observer.next({status: 'NOK', message: 'Se produjo un error', err});
          });
        }, err =>{
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error', err});
        }
      );
    };
    return new Observable(method);
  }

  totalCancellationPurchaseVenta(management: DataManagementService){
    const method = (observer) => {
      this._firestore.getAllVenta(this._infoNegocio.id).pipe(take(1)).subscribe(
        data => {
          const fecha = management.selectedTransaction.fecha.replace('/','-').replace('/','-');
          data[fecha].find(trx => trx.id_venta === management.selectedTransaction.id).estado = 'ANULADO';
          this._firestore.updateVentas(data,this._infoNegocio.id ).subscribe( dta => {
            observer.next({status: 'OK', message: ''});
          }, err => {
            console.log(err);
            observer.next({status: 'NOK', message: 'Se produjo un error', err});
          });
        }, err =>{
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error', err});
        }
      );
    };
    return new Observable(method);
  }

  partialCancellationPurchaseVenta(management: DataManagementService){
    const method = (observer) => {
      this._firestore.getAllVenta(this._infoNegocio.id).pipe(take(1)).subscribe(
        data => {
          const fecha = management.selectedTransaction.fecha.replace('/','-').replace('/','-');
          const newData = data[fecha].find(trx => trx.id_venta === management.selectedTransaction.id);

          this._firestore.getAllInventario(this._infoNegocio.id).pipe(take(1)).subscribe( invProd => {

            const searchProd = newData.detalle_productos.find( x => x.id_inventario === management.selectedProduct.inventario.id);
            newData.detalle_productos = newData.detalle_productos.filter(x => x.id_inventario !== management.selectedProduct.inventario.id);
            newData.total_compra = newData.total_compra - (searchProd.cantidad * searchProd.precio_compra);

            const invProdSelect = invProd.productos.find( x => x.id === management.selectedProduct.inventario.id);
            invProdSelect.cantidad_disponible = (Number(invProdSelect.cantidad_disponible) +  searchProd.cantidad).toString();

            this._firestore.updateInventario(invProd, this._infoNegocio.id).subscribe(
              result => {
                this._firestore.updateVentas(data,this._infoNegocio.id ).subscribe( dta => {
                    observer.next({status: 'OK', message: ''});
                  },
                  err => {
                    console.log(err);
                    observer.next({status: 'NOK', message: 'Se produjo un error', err});
                  }
                );
              },
              err => {
                console.log(err);
                observer.next({status: 'NOK', message: 'Se produjo un error', err});
              }
            );
          });

        }, err =>{
          console.log(err);
          observer.next({status: 'NOK', message: 'Se produjo un error', err});
        }
      );
    };
    return new Observable(method);
  }
}
