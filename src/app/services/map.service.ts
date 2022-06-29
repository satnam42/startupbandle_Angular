import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    public http: HttpClient
  ) { }

  getLocation(){
    return this.http.get('');
  }
}
