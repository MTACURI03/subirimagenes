import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async uploadFile(file: File): Promise<any> {
    const filePath = `${Date.now()}_${file.name}`;
    const { data, error } = await this.supabase
      .storage
      .from(environment.bucket)
      .upload(filePath, file);

    if (error) throw error;
    return data;
  }
}
