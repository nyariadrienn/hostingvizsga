import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { VoteService } from 'src/app/services/vote.service';
import { Quote } from 'src/app/models/quote';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent {
  actual: Quote = new Quote();
  newQuote: Quote = new Quote();
  quotes: Quote[] = [];

  constructor(public service: VoteService, public auth: AuthService, private router: Router) {
    if(!auth.isLoggedIn()) {
      router.navigate(['login']);
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

  addQuote() {
    this.service.addQuote(this.newQuote);
    this.newQuote = new Quote(); 
  }

}
