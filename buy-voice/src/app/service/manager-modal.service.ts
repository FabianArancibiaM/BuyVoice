/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ModalGenericoComponent } from '../ui/modal-generico/modal-generico.component';
import { MessageModal } from '../models/message-modal.model';

type IMessageCategoria = 'A-200' | 'G-200' | 'A-500' | 'G-500'
    | 'T-MICRO' /*Tutorial Microfono*/ | 'NOT-DATA' /* Sin datos*/ | 'ERR-GENERIC' | 'MICRO-500';

@Injectable({
    providedIn: 'root'
})
export class ManagerModal {

    private message = {
        'NOT-DATA':{
            title: '',
            description: 'No se encontraron datos',
            code: '500'
        },
        'ERR-GENERIC':{
            title: 'Fallo!',
            description: 'Se produjo un error',
            code: '500'
        },
        'A-200':{
            title: 'Completado!',
            description: 'La actualización se realizo con éxito!',
            code: '200'
        },
        'A-500':{
            title: 'Fallo!',
            description: 'Se produjo un error al intentar actualizar',
            code: '500'
        },
        'G-200':{
            title: 'Completado!',
            description: 'Se guardo correctamente',
            code: '200'
        },
        'G-500':{
            title: 'Fallo!',
            description: 'Se produjo un error al intentar guardar',
            code: '500'
        },
        'T-MICRO':{
            title: 'Atención!',
            description: 'Debe seguir el siguiente patron: ',
            code: '200'
        },
        'MICRO-500':{
            title: 'Fallo!',
            description: 'Se produjo un error al intentar escuchar',
            code: '500'
        },
        'CUSTOM-001':{
            title: 'Atención!',
            description: '',
            code: '200'
        },
        'CUSTOM-002':{
            title: 'Atención!',
            description: '',
            code: '500'
        }
    };

    private modal;
    private promesa: Subscription[] = [];

    constructor(
        private _modalControl: ModalController,
        private _message: MessageModal
    ) {}

    closeSuscriptionModal(){
        if (this.promesa && this.promesa.length > 0) {
            this.promesa.forEach(p => p.unsubscribe());
          }
    }

    configMessageDEBUG(codeMessage){
        this._message.description = codeMessage;
    }


    configMessage(codeMessage: IMessageCategoria){
        this._message.title = this.message[codeMessage].title;
        this._message.description = this.message[codeMessage].description;
        this._message.code = this.message[codeMessage].code;
    }

    initConfigModal(modal, cssClass?, methodPostClose?){
        this.promesa.push(from(this._modalControl.create({
            component: modal,
            cssClass: cssClass? cssClass : '',
          })).subscribe(data => this.openModal(data, methodPostClose), err => console.log(err)));
    }

    openModal(modal, methodPostClose?) {
        this.promesa.push(from(modal.onDidDismiss()).subscribe(() => {
            if (methodPostClose) {
                methodPostClose();
            }
        }, err => console.log(err)));
        this.promesa.push(from(modal.present()).subscribe(data => {}, err => console.log(err)));
    }
}
