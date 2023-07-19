import { User } from "./user";

export class Quote {
    quote: string = '';
    author: string = '';
    creator: User = new User();
    voters: User[] = [];
}
