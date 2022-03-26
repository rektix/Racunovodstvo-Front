import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class BookkeepingJournalGuard implements CanActivate {
  constructor(private userService: UserService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.userService.getPermissions().subscribe(permissions => {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].name.toLowerCase() == 'dnevnik knjizenja')
          return true;
      }
      return false;
    })
    return false;
  }

}
