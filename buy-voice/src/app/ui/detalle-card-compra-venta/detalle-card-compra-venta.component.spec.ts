import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleCardCompraVentaComponent } from './detalle-card-compra-venta.component';

describe('DetalleCardCompraVentaComponent', () => {
  let component: DetalleCardCompraVentaComponent;
  let fixture: ComponentFixture<DetalleCardCompraVentaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCardCompraVentaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleCardCompraVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
