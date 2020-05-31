import { partisip } from "./partisip.model";

export class Event{
    photo:string;
    constructor(public Discription:string,
        public datetime:string,
        public Nom:string,
        public Partisipez:partisip
        ){}
}