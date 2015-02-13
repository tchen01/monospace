/**
 * Observe DOM mutations and convert monospace code blocks
 * @author Tyler Chen, Jesse Mu
 */
var observerConfig = {
    childList: true,
    subtree: false,
    characterData: false,
    attributes: false
};

function monospaceListen() {
    var monospaceObserver = new MutationObserver(function(ms) {
        ms.forEach(function(m) {
            if (m.addedNodes.length > 0) { //do we even need this part?
                console.log(m.addedNodes);
                for (l = 0; l < m.addedNodes.length; l++) {
                    //there is probably a quicker way to get these elements.
                    var cfx = m.addedNodes[l].getElementsByClassName("_38");
                    for (c = 0; c < cfx.length; c++) {
                        if (cfx[c].firstChild.className !== "null monospaced") { //prevent from drawing on previously drawn elements.
                            cfx[c].firstChild.innerHTML = cfx[c].firstChild.innerHTML.replace(/(<\/p><p>)/g, "\n\n");
                            draw(cfx[c].firstChild);
                        }
                    }
                }
            }
        });
    });
    monospaceObserver.observe(document.getElementById('webMessengerRecentMessages'), observerConfig);
}

function initialDraw() { //I think my function names make no sense
    var cfx = document.getElementById('webMessengerRecentMessages').getElementsByClassName("_38");
    for (c = 0; c < cfx.length; c++) {
        cfx[c].firstChild.innerHTML = cfx[c].firstChild.innerHTML.replace(/(<\/p><p>)/g, "\n\n");
        draw(cfx[c].firstChild);
    }
}

var checkForMsg = setInterval(function() {
    var msgWindow = document.getElementById('webMessengerRecentMessages');
    console.log('seach');
    if (msgWindow !== null) {
        console.log('found!');
        initialDraw();
        monospaceListen(msgWindow, observerConfig);
        clearInterval(checkForMsg);
    }
}, 50);
