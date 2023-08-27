import { Scanner } from "./scanner.js";
import { parse } from "./parser.js";

export function evaluate(text){
    const _ast= parse(text);

    //implement α-reduction <~ it might not be needed;;
    /*
    const _alpha = (ast, term) => {
        let r = ast[0];
        switch(r){
            case "abs":
                
            case "app":
                let a = _alpha(ast[1], term);
                let b = _alpha(ast[2], term);
                return ["app", a, b];
            default:
                return term;
        }
    }
    */

    //implement β-reduction
    //((λx.(λy.x))x)で上手く評価できないsubのところ、
    //適用があって二重に抽象してる時?
    const _beta = (ast) => {
        let r = ast[0];
        switch (r) {
            case "abs":
                return ast; //abstraction内の簡約を許さない
            case "app":
                if(ast[1][0] == "abs"){
                    let absVar = ast[1][1][0];
                    let absBody = ast[1][2];
                    let red = sub(absVar, absBody, ast[2]);
                    return red;
                }else{
                    let x =  ["app", _beta(ast[1]), _beta(ast[2])];
                    return _beta(x);
                }
            default:
                return ast;
        }
    }
    return _beta(_ast);
}

function sub(absVar, absBody, term){
    let r = absBody[0];
    switch (r) {
        case "app":
            let app1 = sub(absVar, absBody[1], term);
            let app2 = sub(absVar, absBody[2], term);
            return ["app", app1, app2];
        case "abs":
            if(absBody[1][0] != absVar) return ["abs", absBody[1], sub(absVar, absBody[2], term)];
            else return absBody;
        default:
            if(absVar == r) return term;
            else return [r];
    }
}