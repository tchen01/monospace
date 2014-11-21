/**
 * Observe DOM mutations and convert monospace code blocks
 * @author Tyler Chen, Jesse Mu
 */

var observerConfig = {
    childList: true,
    subtree: true,
    characterData: false,
    attributes: false
};

var cfx = []; //ideally array containing all '_3hi clearfix' div 
//there is probably a way to avoid having to recreate this every mutation.

function monospaceListen() {
    var monospaceObserver = new MutationObserver(function(ms) {
        ms.forEach(function(m) {
            if (m.addedNodes.length > 0) { //do we even need this part?
                console.log(m.addedNodes);
                for(l=0; l<m.addedNodes.length; l++){
                    console.log(m.addedNodes[l].getElementsByClassName( "_38" )); 
                    
                    //there is probably a quicker way to get these elements.
                    var cfx = m.addedNodes[l].getElementsByClassName( "_38" );
                    for(c=0; c<cfx.length; c++){
                      draw(cfx[c].firstChild.firstChild);
                      //%div._38 -> %span -> %p
                    }
                    //cfx = cfx.concat( m.addedNodes[l].getElementsByClassName( "_3hi clearfix" )[0] ); //Y I AM DUM?? 
                }
            }
        });
    });
    monospaceObserver.observe(document.getElementById('webMessengerRecentMessages'), observerConfig);
}

//this should return nothing if only one line
function nBuild(newtext) {
    n = "";
    for (m = 1; m < newtext.split('\n').length + 1; m++) {
        n += "<br/>" + m;
    }
    return n.substring(5, n.length);
}

var del = "```";
var rev = del.split('').reverse().join('');


var text = [];


function draw(em) {
    text = em.innerText;
    console.log( text );
    var stop_index = text.lastIndexOf(rev);
    var start_index = text.indexOf(del);

    if (stop_index > start_index && start_index > -1) {
        var regexExpression = "("+del+"|"+rev+")";
        var regex = new RegExp(regexExpression, "g");
        var texts = text.split( regex );
        var codes = text.match( regex );
        
        var newtext = "";
        var text_hold = "";
        var code_hold = "";
        var state = 0; //1: after code start delimiter but before stop
        var words = text.split( regex );
        console.log( words );
        
        //http://jsfiddle.net/m9eLk17a/1/
        function write(){
          for(i = 0; i < words.length; i++){
              if( state == 0){
                if( words[i] == del){
                    newtext += "<p>" + text_hold + "</p>";
                    state = 1;
                    text_hold = "";
                } else {
                    text_hold += words[i];
                }
            } else { //state == 1
                if( words[i] == rev ){
                    num = nBuild( code_hold );
                    if( num == 1){
                      newtext += "<div class='code inline'>"; //linebreaks next to delimiter not transferring.
                    } else {
                      newtext += "<div class='code'><div class='block_container'><div class='numbers'>" + nBuild( code_hold ) +"</div>";
                    }
                    newtext += "<pre class='text'>" + code_hold + "</pre></div></div>";
                    console.log( code_hold );
                    state = 0;
                    code_hold = "";
                    } else {
                        code_hold += words[i];
                    }
                }
            }
            newtext += "<p>" + text_hold + code_hold + "</p>"; //would prefer not to change <p> to inline. Either add class or change tag
            console.log( newtext );
        }
        write();
        //extra line breaks in block causes it to break...
        //extra line breaks of regular text are deleted. This is probably reason for above issue
        
        //two inline blocks in a row have no padding/margin between them.
        
        em.outerHTML = newtext;
        console.log(em);
        //highlight at some point...
    }
}

var checkForMsg = setInterval(function() {
    var msgWindow = document.getElementById('webMessengerRecentMessages');
    if (msgWindow !== null) {
        console.log('found!');
        monospaceListen(msgWindow, observerConfig);
        clearInterval(checkForMsg);
    }
}, 50);
