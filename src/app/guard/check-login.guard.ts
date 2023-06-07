import { CanActivateFn } from '@angular/router';

import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const checkLoginGuard: CanActivateFn = (route, state) => {
  let isAllow: boolean = false;

  if (typeof(Storage) !== "undefined") {
    let isLogin: null | string = localStorage.getItem("isLogin");
    isAllow = (isLogin === 'true');
  }

  if(!isAllow){
    const router = inject(Router);
    return router.parseUrl('/login');
  }
  else return true;
};
