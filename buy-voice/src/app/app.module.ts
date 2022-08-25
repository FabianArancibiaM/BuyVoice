import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReportePipe } from './reporte.pipe';
import { InfoMenu } from './models/info-menu.model';

@NgModule({
  declarations: [AppComponent, ReportePipe],
  imports: [BrowserModule, IonicModule.forRoot({
    backButtonText : 'Volver'
  }), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },InfoMenu],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
