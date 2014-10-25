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

function monospaceListen() {
    var monospaceObserver = new MutationObserver(function(ms) {
        ms.forEach(function(m) {
            if (m.addedNodes.length > 0) {
                if (m.addedNodes[0].className === "_3hi clearfix") {
                    // div _3hi -> div _38 -> span null -> p
                    draw(m.addedNodes[0].firstChild.firstChild.firstChild);
                }
            }
        });
    });
    // TODO change event listener location depending on major website
    monospaceObserver.observe(document.getElementById('webMessengerRecentMessages'), observerConfig);
}

var start = "`~";
var stop = "~`";
var l = 2;

var text = [];

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

var checkForMsg = setInterval(function() {
    var msgWindow = document.getElementById('webMessengerRecentMessages');
    if (msgWindow !== null) {
        console.log('found!');
        monospaceListen(msgWindow, observerConfig);
        clearInterval(checkForMsg);
    }
}, 50);
