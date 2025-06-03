import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Subir archivo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <input type="file" (change)="onFileSelected($event)" />
      <ion-button expand="full" (click)="upload()">Subir</ion-button>
    </ion-content>
  `
})
export class HomePage {
  selectedFile: File | null = null;

  constructor(
    private supabaseService: SupabaseService,
    private alertCtrl: AlertController
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  async upload() {
    if (!this.selectedFile) {
      this.showAlert('Por favor selecciona un archivo');
      return;
    }

    try {
      const result = await this.supabaseService.uploadFile(this.selectedFile);
      this.showAlert(`Archivo subido correctamente: ${result.path}`);
    } catch (err: any) {
      this.showAlert(`Error: ${err.message}`);
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Resultado',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}

