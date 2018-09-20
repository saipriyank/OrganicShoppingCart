import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map} from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurd implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate( ): Observable<boolean> {
   return this.auth.appUSer$.pipe(map(res => res.isAdmin));
  }
}
