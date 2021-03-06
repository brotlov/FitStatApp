import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import {APP_ROUTES_PROVIDER} from './app/app.route';
import { HttpModule, RequestOptions } from '@angular/http';
import {GlobalService} from './app/global.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, [APP_ROUTES_PROVIDER,HttpModule, RequestOptions,GlobalService]);
