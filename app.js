/**
 * Observe DOM mutations and covnert monospace code blocks
 * @author Tyler Chen, Jesse Mu
 */

var checkExist = setInterval(function() {
   if (document.getElementById("webMessengerRecentMessages") !== null) {
      console.log( "Exists!" );
      monospaceInit();
      clearInterval(checkExist);
   }
}, 50);

function monospaceInit() {
    window.msgWindow = document.getElementById("webMessengerRecentMessages");
    update();
    // TODO: Update to just draw new elements.
    msgWindow.addEventListener('DOMNodeInserted', update, false);
}

var start = "`~";
var stop = "~`";

var del = "```";
var rev = "```"; //dynamically reverse del
var l = 2;


var text = [];

function update() {
    // TODO: fix discrepancies here
    var msgWindow = document.getElementById("webMessengerRecentMessages");
    var chat = msgWindow.getElementsByClassName("_38");

    // FB large chat specific
    for (i = chat.length-1; i >= 0; i--) {
        draw(chat[i].getElementsByTagName("p")[0]);
    }
}

//this should return nothing if only one line
function nBuild(newtext) {
    n = "";
    for (m = 1; m < newtext.split('\n').length + 1; m++) {
        n += "<br/>" + m;
    }
    return n.substring(5, n.length);
}


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
                    newtext += "<div class='code'><div class='numbers'>" + nBuild( code_hold ) +"</div>";
                    newtext += "<pre class='text'>" + code_hold + "</pre></div>";
                    console.log( code_hold );
                    state = 0;
                    code_hold = "";
                    } else {
                        code_hold += words[i];
                    }
                }
            }
            newtext += "<p>" + text_hold + code_hold + "</p>";
            console.log( newtext );
            newtext = newtext.replace( "<div class='code'><div class='numbers'>1</div>", "<div class='code inline'>");
            document.getElementById("a").innerHTML = newtext;
            console.log ( document.getElementById("a").innerHTML );
        }
        write();

       /* IMPORTANT */
        //how do <p> get into %div.code???
        //running refresh too many times and not ignoring drawn sections?
        
        em.outerHTML = newtext;
        hljs.highlightBlock(em.getElementsByClassName('text')[0]);
    }
}

var a = function assemble (w, s, t){
    var l = w.length;
    
    if( l <= 1 ) console.log( t + w[0]);
    
    if( s > 0 ){
        t += w[0];
        w.shift();
    }
    t += "<span>" + w[0] + "</span>";
    console.log(t);
    w.shift()
    assemble(w, 1, t);
}
