import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PagesModule } from './views/pages.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './stores/user/user.reducer';
import { commandReducer } from './stores/command/command.reducer';
import { deviceReducer } from './stores/device/device.reducer';
import { TemplatesModule } from './templates/templates.module';
import { MqttModule } from 'ngx-mqtt';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { DevicesEffects } from './stores/device/device.effects';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    PagesModule,
    TemplatesModule,
    BrowserModule,
    HttpClientModule,
    MqttModule.forRoot(environment.MQTT_SERVICE_OPTIONS),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot({
      mode: "ios"
    }),
    AppRoutingModule,
    EffectsModule.forRoot(DevicesEffects),
    StoreModule.forRoot({
      user: userReducer,
      commands: commandReducer,
      device: deviceReducer,
    })],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule { }
