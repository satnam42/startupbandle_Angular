import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route:Router){}
  
  canActivate(){
    
    if (localStorage.getItem('token')) {
      return true;

  }
this.route.navigate(['/login']);
  return false;
  
}
}
