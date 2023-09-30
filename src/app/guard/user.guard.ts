import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {

  constructor(private AccountService:AccountService){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    console.log('GuardRunning');
    this.AccountService.checkToken();
    return true;
  }
}
