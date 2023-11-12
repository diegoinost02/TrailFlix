import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const usersService = inject(UsersService);
  const router = inject(Router);
  const isLoged = usersService.checkAuthentication()

  if(!isLoged){
    router.navigate([''])
  }

  return true;
};