import { ProductoComunModel } from '../models/producto-comun.model';
import { CompraVentaModel } from './../models/compra-venta.model';

export interface ICompraVenta {
    title: string;
    detalle: string;
    monto: string;
    flow: 'EDIT' | 'DEATAIL';
    index: number;
}
