/**
 * Observe DOM mutations and covnert monospace code blocks
 * @author Tyler Chen, Jesse Mu
 */

var checkExist = setInterval(function() {
   if (document.getElementById("webMessengerRecentMessages") !== null) {
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

function nBuild(newtext) {
    n = "";
    for (i = 1; i < newtext.split('\n').length + 1; i++) {
        n += "<br/>" + i;
    }
    return n.substring(5, n.length);
}

function draw(em) {
    words = em.innerText;
    var stop_index = words.indexOf(stop);
    var start_index = words.indexOf(start);
    // console.log( words.indexOf( "\n" ), start_index, stop_index );

    if (stop_index > start_index && start_index > -1) {

        var newtext = words.substr(start_index + l, stop_index - start_index - l);
        newtext = newtext.replace(/^[\r\n]+|[\r\n]+$/g, '');

        var numbers = nBuild(newtext);

        em.className += " code";
        em.innerHTML = "<div class='numbers'>" + numbers + "</div><pre class='text'>" + newtext + "</pre>";
        hljs.highlightBlock(em.getElementsByClassName('text')[0]);
    }
}
