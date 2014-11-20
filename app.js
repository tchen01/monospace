/**
 * Observe DOM mutations and covnert monospace code blocks
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
            if (m.addedNodes.length > 0) {
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
                console.log( "cfx: " + cfx );
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
var rev = "```"; //dynamically reverse del


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
                      newtext += "<div class='code inline'>"; //linebreaks at intersections having some issues.
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
            newtext += "<p>" + text_hold + code_hold + "</p>"; //would prefern not to change <p> to inline. Either add class or change tag
            console.log( newtext );
        }
        write();

       /* IMPORTANT */
        //how do <p> get into %div.code???
        //running refresh too many times and not ignoring drawn sections?
        
        em.outerHTML = newtext;
        console.log( em );
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
