import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
   }

   googleAuth() {
    return this.login(new GoogleAuthProvider());
   }

   logout() {
    return this.afAuth.signOut().then(q => {
      localStorage.clear();
    })
   }

   getCurrentUser(): User {
    let u = new User();
    u.email = localStorage.getItem('email') as string;
    let dpname = localStorage.getItem('displayname') as string;
    u.firstName = dpname.split(' ')[0];
    u.lastName = dpname.split(' ')[1];
    return u;
   }

   isLoggedIn(){
    let email = localStorage.getItem('email');
    return email != null;
  }

  login(provider: any){
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user != undefined){
          localStorage.setItem('email', <string>result.user.email);
          localStorage.setItem('displayname', <string>result.user.displayName);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
}

