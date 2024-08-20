import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const normalGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);

  const router = inject(Router);

  if(loginService.isLoggedIn() && loginService.getUserRole() === 'Normal'){
    return true;
  }
  else{
    router.navigate(['login']);
    return false;
  }
};
