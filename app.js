/**
 * Observe DOM mutations and covnert monospace code blocks
 * @author Tyler Chen, Jesse Mu
 */

var observerConfig = {
    childList: true,
    subtree: true
};

function monospaceListen() {
    console.log("calling monospace...");
    var monospaceObserver = new MutationObserver(function(ms) {
        ms.forEach(function(m) {
            console.log(m.type);
        });
    });
    monospaceObserver.observe(document.body, observerConfig);
}

var start = "`~";
var stop = "~`";
var l = 2;

var text = [];

function detect() {
    var msgWindow = document.getElementById("webMessengerRecentMessages");
    //^ something still sketchy about this.

    //characters for codeblock


    var chat = msgWindow.getElementsByClassName("_38");

    //FB large chat specific
    for (i = chat.length - 1; i >= 0; i--) {
        draw(chat[i].getElementsByTagName("p")[0]);
    }
}

//run draw only on new element
function update(e) {
    console.log("update");
    console.log(e);
    if (true) {
        detect();
    }
}

function copy(e) {
    console.log("!!!");
}

function n_build(newtext) {
    n = "";
    for (i = 1; i < newtext.split('\n').length + 1; i++) {
        n += "<br/>" + i;
    }
    return n.substring(5, n.length);
}

function draw(em) {
    em.addEventListener("click", copy, false);

    words = em.innerText;
    var stop_index = words.indexOf(stop);
    var start_index = words.indexOf(start);
    // console.log( words.indexOf( "\n" ), start_index, stop_index );

    if (stop_index > start_index && start_index > -1) {

        var newtext = words.substr(start_index + l, stop_index - start_index - l);
        newtext = newtext.replace(/^[\r\n]+|[\r\n]+$/g, '');

        var numbers = n_build(newtext);

        em.className += " code";
        em.innerHTML = "<div class='numbers'>" + numbers + "</div><pre class='text'>" + newtext + "</pre>";
        hljs.highlightBlock(em.getElementsByClassName('text')[0]);
    }

}

monospaceListen();
