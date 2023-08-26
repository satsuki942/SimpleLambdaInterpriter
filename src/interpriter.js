import { Scanner } from "./scanner.js";
import { parse } from "./parser.js";

export function evaluate(text){
    const ast= parse(text);

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
    const _beta = (ast) => {
        let r = ast[0];
        switch (r) {
            case "abs":
                return ast;
            case "app":
                if(ast[1][0] == "abs"){
                    let red = sub(ast[1], ast[2]);
                    return red;
                }else{
                    return ["app", _beta(ast[1]), _beta(ast[2])];
                }
            default:
                return ast;
        }
    }
    return _beta(ast);
}

function sub(abs, term){
    let absHead = abs[1];
    let absBody = abs[2];
    let absVar = absHead[0][1];
    let r = absBody[0];
    switch (r) {
        case "app":
            let app1 = ["abs", [`λ${absVar}.`], absBody[1]];
            let app2 = ["abs", [`λ${absVar}.`], absBody[2]];
            return ["app", sub(app1, term), sub(app2, term)];
        case "abs":
            if(absBody[1][0][1] != absVar) return ["abs", absBody[1], sub(absBody[2], term)];
            else return absBody;
        default:
            if(absVar == r) return term;
            else return [r];
    }
}