import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScopesService {
  isAdmin = false;
  constructor() {}

  toggleAdmin() {
    this.isAdmin = !this.isAdmin;
  }

  protectedRoutes(url: string) {
    return url.includes('users');
  }
}
