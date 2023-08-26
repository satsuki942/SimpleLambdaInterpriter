export class Scanner_{
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
export class Scanner{
    constructor(text){
        const getToken = () => {
            let tokens = [];
            let x;
            let le = text.length;
            for(let i = 0; i < le; i++){
                switch (text[i]){
                    case " ":
                        continue;
                    default:
                        if(text[i] == "λ"){
                            x = text[i];
                            x += text[i+1];
                            x += text[i+2];
                            i += 2;
                            tokens.push(x);
                        }else tokens.push(text[i]);
                }
            }
            return tokens;
        }
        this.tokens = getToken();
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
export function getTokens(text){
    const r = new Scanner(text);
    return Scanner.tokens;
}