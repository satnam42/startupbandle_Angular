import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() {
  }

  getItem(key: string): any {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    return localStorage.clear();
  }

  getObject(key): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setObject(key: string, value: any): any {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

}
