import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Quote } from 'src/app/models/quote';
import { AuthService } from 'src/app/services/auth.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent {
  actual: Quote = new Quote();

  constructor(public service: VoteService, public auth: AuthService, private router: Router) {
    if(!auth.isLoggedIn()) {
      router.navigate(['login']);
      console.log();
    }
    else {
      this.actual.creator = auth.getCurrentUser();
    }
  }

  logout() {
    this.auth.logout().then(q => {
      this.router.navigate(['login']);
    });
  }
}
