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
    //msgWindow.addEventListener('DOMNodeInserted', update, false);
}

var del = "```";
var rev = "```"; //dynamically reverse del


var text = [];

function update() {
    // TODO: fix discrepancies here
    var msgWindow = document.getElementById("webMessengerRecentMessages");
    var chat = msgWindow.getElementsByClassName("_38");

    // FB large chat specific
    for (k = chat.length-1; k >= 0; k--) { //what did it do wrong that makes the index variables interfere?
        console.log( k );
        draw(chat[k].getElementsByTagName("p")[0]);
        // hljs.highlightBlock(chat[k].getElementsByClassName('text')[0]); //this is breaking inline //shouldn't use 'text[0]' since there could be more than one...

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
                      newtext += "<div class='code inline'>";
                    } else {
                      newtext += "<div class='code'><div class='numbers'>" + nBuild( code_hold ) +"</div>";
                    }
                    newtext += "<pre class='text'>" + code_hold + "</pre></div>";
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
