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
    for (m = 0; m < nt.split('<br/>').length; m++) {
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
    var text = em.innerText.replace(/\n/g, "<br/>"); //why do we do this? I think it might not be necessary
    var regex = new RegExp("("+del+"|"+rev+"|<br/>)", "g");
    var words = text.split( regex ).filter(function(a){ return a !== ""; }); 
    em.innerHTML = '';
    var state = 0; //1: in code area
    var textHold = '';
    var codeHold = '';
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
            } else if( words[i] === "<br/>" ){
                if( textHold !== '' ){
                    var p = document.createElement( 'p' );
                    p.classList.add('inline');
                    p.innerText = textHold;
                    em.appendChild(p);
                    textHold = '';
                }
                var br = document.createElement( 'br' );
                em.appendChild(br);
                
            } else {
                textHold += words[i];
            }
        } else { //inside code (state === 0)
            if( words[i] === rev){
                var num = nBuild( codeHold );
                var code = document.createElement( 'div' );
                code.classList.add( 'code' );
                codeHold = codeHold.replace(/(<br\/>)/g, "\n");
                
                var pre = document.createElement( 'pre' );
               
                if( num === "1" ){
                    code.classList.add( 'inline' );
                    pre.classList.add( 'inline' );
                } else {
                    var numbers = document.createElement( 'div' );
                    numbers.classList.add( 'numbers' );
                    numbers.innerHTML = num;
                    code.appendChild( numbers );                    
                }
                pre.classList.add( 'text' );
                pre.innerText = codeHold;
                hljs.highlightBlock( pre );
                code.appendChild( pre );
                em.appendChild( code );
                state = 0;
                codeHold = '';
            } else if( words[i] === "<br/>"){
                if(words[i-1] === del || words[i+1] === rev){
                    console.log('skip');
                } else {
                    codeHold += words[i];
                }
            } else {
                codeHold += words[i];   
            }
        }
    }
}