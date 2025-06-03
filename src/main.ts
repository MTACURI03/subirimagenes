import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { HomePage } from './app/home/home.page';

bootstrapApplication(HomePage, {
  providers: [provideIonicAngular()]
});
