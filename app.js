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

function draw(em){
    var text = em.innerText.replace(/\n/g, "<br/>"); 
    console.log(text);
    var regex = new RegExp("("+del+"|"+rev+"|<br/>)", "g");
    var words = text.split( regex ); //may need "" filtered out
    console.log(words);
    em.innerHTML = '';
    var state = 0; //1: in code area
    var textHold = '';
    var codeHold = '';
    for(var i=0; i<words.length; i++){
        if( state === 0 ){ //outside code
            if( words[i] === del ){
                var p = document.createElement( 'p' );
                p.classList.add('inline');
                p.innerText = textHold;
                em.appendChild(p);
                
                state = 1;
                textHold = '';
            } else if( words[i] === "<br/>" ){
                var p = document.createElement( 'p' );
                p.classList.add('inline');
                p.innerText = textHold;
                em.appendChild(p);
                
                var br = document.createElement( 'br' );
                em.appendChild(br);
                
                textHold = '';
            } else {
                textHold += words[i];
            }
        } else { //inside code (state === 0)
            if( words[i] === rev){
                var num = nBuild( codeHold );
                var code = document.createElement( 'div' );
                code.classList.add( 'code' );
                codeHold = codeHold.replace(/(<br\/>)/g, "\n");
                if( num === "1" ){
                    code.classList.add( 'inline' );
                } else {
                    var numbers = document.createElement( 'div' );
                    numbers.classList.add( 'numbers' );
                    numbers.innerHTML = num;
                    code.appendChild( numbers );                    
                }
                var pre = document.createElement( 'pre' );
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