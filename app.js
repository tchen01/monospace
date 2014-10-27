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
    var stop_index = text.lastIndexOf(del);
    var start_index = text.indexOf(del);
    // console.log( words.indexOf( "\n" ), start_index, stop_index );
    //"/(" + del + ")(?:(?=(\\?))\2[^])*?\1/g";
    if (stop_index > start_index && start_index > -1) {
        // var regexExpression = "(" + del + ")(?:(?=(\\?))\2[^])*?\1";
        // var regex = new RegExp(regexExpression, "g");
        // var texts = text.split( /(```)(?:(?=(\\?))\2[^])*?\1/g );
        // var codes = text.match( regex );
        
        // var words = []; //array of words and codes in same order as text
        // //make sure code is up first
        // if( start_index > 0){
            // newtext += texts[0];
            // texts.split();
        // }
        
        // //starts with codes[0] and builds innerHTML for em
        // for(i = 0; i < codes.length; i++){
            // newtext += "<div class='numbers'>" + nBuild(codes[i]) +"</div><pre class='text'>" + codes[i] + "</pre>";
            // if(texts[i] != undefined){
                // newtext += texts[i];
            // }
        // }
        
        var newtext = "";
        var state = 0;
        var words = text.split(/(```)/);
        for(i = 0; i < words.length; i++){
            console.log( i, words[i]);
            if(words[i] == del){
                if( state == 0){
                    newtext += "<div class='numbers'>" + nBuild(words[i + 1]) +"</div><pre class='text'>"; 
                    state = 1;
                } else {
                    newtext += "</pre>"
                    state = 0;
                }
            } else if(words[i] == "") {
            } else {
                newtext += words[i]; // text innerHTML part
            }
            
        }
        
        em.className += " code"; //this causes unelemented text to still be part of '.code' parent
        em.innerHTML = newtext;
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
