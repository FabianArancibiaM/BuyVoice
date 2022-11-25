import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MessageModal } from 'src/app/models/message-modal.model';

@Component({
  selector: 'app-modal-generico',
  templateUrl: './modal-generico.component.html',
  styleUrls: ['./modal-generico.component.scss'],
})
export class ModalGenericoComponent implements OnInit {

  constructor(
    private controller: ModalController,
    public message: MessageModal
  ) { }

  ngOnInit() {}
  
  close(){
    this.controller.dismiss();
  }
}
