export class Scanner{
    constructor(text){
        this.tokens = text.trim().split(/ /);
        this.pos = 0;
    }
    peek(){
        return this.tokens[this.pos];
    }
    next(){
        this.pos += 1;
        return this.tokens[this.pos];
    }
}