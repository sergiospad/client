import {ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {TokenStorageService} from '../service/token-storage.service';
import {NotificationService} from '../service/notification-service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenStorageService);
  private readonly notificationService = inject(NotificationService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const resp = this.tokenService.getResponse();
    if(resp) {
      return true;
    }
    this.router.navigate(['/login'], {queryParams:{returnUrl:state.url}});
    this.notificationService.showSnackBar("Token Expired")
    return false;
  }
}
