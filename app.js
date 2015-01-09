/**
 * Contains main functions for monospace
 * @author Tyler Chen, Jesse Mu
 */

var del;
var rev;
var numbers;

//only works if #appJS exists (defined from a content-script)
function getVars(){
    var monospace = document.getElementById('appJS');
    var obj = monospace.getAttribute('data-vars');
    var obj = obj.substring(0, obj.length - 1);
    var vars = JSON.parse("{" + obj + "}");
    del  = vars.del;
    rev = vars.rev;
    numbers = vars.numbers;
}

function nBuild(nt) {
    n = "";
    for (m = 0; m < nt.split('\n').length; m++) {
        n += "<br/>" + (m + 1);
    }
    return n.substring(5, n.length);
}

//checks if element object contains code snippets
function draw(em){
    var text = em.innerText;
    
    var stopIndex = text.lastIndexOf(rev);
    var startIndex = text.indexOf(del);

    if (stopIndex > startIndex && startIndex > -1) {
        write(em);
    }
    
}

//formats snippets of code from element objects
function write(em){
    var regex = new RegExp("("+del+"|"+rev+"|\n)", "g");
    var words = em.innerText.split( regex ).filter(function(a){ return a !== ""; }); 
    em.innerHTML = '';
    var state = 0; 
    var textHold = '';
    var codeHold = '';
    console.log( words );
    for(var i=0; i<words.length; i++){
        if( state === 0 ){ //outside code
            if( words[i] === del ){
                if( textHold !== '' ){
                    var p = document.createElement( 'p' );
                    p.classList.add('inline');
                    p.innerText = textHold; 
                    em.appendChild(p);
                    textHold = '';
                }
                state = 1;        
            } else {
                textHold += words[i];
            }
        } else { //inside code (state === 0)
            if( words[i] === rev){
                if( codeHold !== '' ){

                    var num = nBuild( codeHold );
                    var code = document.createElement( 'div' );
                    code.classList.add( 'code' );
                    code.classList.add( 'hljs' );
                    var pre = document.createElement( 'pre' );
                   
                    if( num === "1" ){
                        code.classList.add( 'inline' );
                        pre.classList.add( 'inline' );
                    } else {
                    //    if( numbers === "false" ){ //numbers isn't global??
                            var numbers = document.createElement( 'div' );
                            numbers.classList.add( 'numbers' );
                            numbers.innerHTML = num;
                            code.appendChild( numbers );     
                   //     }
                    }
                    pre.classList.add( 'text' );
                    pre.innerText = codeHold;
                    hljs.highlightBlock( pre );
                    code.appendChild( pre );
                    em.appendChild( code );
                    codeHold = '';
                }
                state = 0;
            } else {
                codeHold += words[i];   
            }
        }
    }
    var p = document.createElement( 'p' );
    p.classList.add('inline');
    p.innerText = (state === 0) ? textHold : del + codeHold;
    em.appendChild(p);
}