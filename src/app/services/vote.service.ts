import { Injectable } from '@angular/core';
import { Quote } from '../models/quote';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  quotes: Map<string, Quote> = new Map<string, Quote>();

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    db.object('quotes').valueChanges().subscribe(q => {
      this.quotes = new Map(Object.entries(q as object));
    });
  } 
  
  addQuote(q: Quote) {
    let quotesArray = Array.from(this.quotes.values());
    if (quotesArray.find(t => t.quote == q.quote) == undefined){
      let clonedQuote: Quote = JSON.parse(JSON.stringify(q));
      clonedQuote.voters.push(q.creator);
      this.db.list('quotes').push(clonedQuote);
    }
    else{
      alert('This quote is already exists!');
    }
    console.log(quotesArray);
  }

  vote(id: string){
    let quote = this.quotes.get(id);
    if (quote?.voters.find(t => t.email == this.auth.getCurrentUser().email) == undefined)
    {
      quote?.voters.push(this.auth.getCurrentUser());
    }
    this.db.list('quotes').update(id, quote as Quote);
  }

  unvote(id: string){
    let quote = this.quotes.get(id);
    if (quote?.creator.email != this.auth.getCurrentUser().email)
    {
      if (quote?.voters.find(t => t.email == this.auth.getCurrentUser().email) != undefined)
      {
        quote.voters = quote.voters.filter(t => t.email != this.auth.getCurrentUser().email);
      }
      this.db.list('quotes').update(id, quote as Quote);
    }
  }

  isVoted(q: Quote){
    return q.voters.find(t => t.email == this.auth.getCurrentUser().email) != undefined;
  }

}
