import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public auth: AuthService, private router: Router) {
    }

    loginGoogle() {
      this.auth.googleAuth().then(z => {
        this.router.navigate(['vote']);
      })
    }
}
