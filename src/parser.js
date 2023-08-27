import { Scanner } from "./scanner.js";

export function parse(text){
    const r = new Scanner(text);
    for(let i=0;i<r.tokens.length;i++){
        console.log(r.tokens[i]);
    }

    /* λx. (λx. x  x)  (λx. x  x)  */
    //  <expr> | <idenifier>, ( λ<identifier>. <expr> ),( <expr> <expr> )
    //  <identifier> | [a-z]

    
    const expr = () => {
        if(r.peek() == "("){
            r.pos += 1;
            let inParen;
            if(r.peek().match(/λ[a-z]./)){
                let absHead = [r.peek()[1]];
                r.pos += 1;
                let absBody = expr();
                inParen = ["abs", absHead, absBody];
            }else{
                let appPre = expr();
                r.pos += 1;
                let appPos = expr();
                inParen = ["app", appPre, appPos];
            }
            r.pos += 1;
            if(r.peek() == ")"){
                return inParen;
            }else{
                console.log("括弧がマッチしてない");
                return undefined;
            }
        }
        return identifier();
    }
    const identifier = () => {
        if(r.peek().match(/[a-z]/)){
            return [r.peek()];
        }else{
            console.log("varが[a-z]でない");
            return undefined;
        }
    }
    let ast = expr();
    return ast;

}