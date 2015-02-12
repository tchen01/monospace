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
    var n = "";
    for (var m = 1; m <= nt.split('\n').length; m++) {
        n += "<br/>" + m;
    }
    return n.substring(5, n.length);
}

//checks if element object contains code snippets
//swtich b
function draw(em){
    var text = em.innerHTML;
    
    var stopIndex = text.lastIndexOf(rev);
    var startIndex = text.indexOf(del);

    if (stopIndex > startIndex && startIndex > -1) {
        write(em);
    }
    
}

//formats snippets of code from element objects
function write(em){
    em.classList.add('monospaced');
    console.log( numbers );
    var regex = new RegExp("("+del+"|"+rev+"|\n)", "g");
    var words = em.innerHTML.split( regex ).filter(function(a){ return a !== ""; }); 
    em.innerHTML = '';
    var state = 0; 
    var textHold = '';
    var codeHold = '';
    console.log( words  + del);
    for(var i=0; i<words.length; i++){
        if( state === 0 ){ //outside code
            if( words[i] === del ){
                if( textHold !== '  ' ){
                    var p = document.createElement( 'p' );
                    p.classList.add('inline');
                    p.innerHTML = textHold; 
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
                        if( numbers === "false" ){ // is this the best way to hide numbers?
                            var nums = document.createElement( 'div' );
                            nums.classList.add( 'numbers' );
                            nums.innerHTML = num;
                            code.appendChild( nums );     
                        }
                    }
                    pre.classList.add( 'text' );
                    pre.innerHTML = codeHold;
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
    p.innerHTML = (state === 0) ? textHold : del + codeHold;
    if( p.innerHTML !== ''){
        em.appendChild(p);
    }
}