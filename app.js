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

var cfx = []; //array containing all '_3hi clearfix' div 
//there is probably a way to avoid having to recreate this every mutation.

function monospaceListen() {
    var monospaceObserver = new MutationObserver(function(ms) {
        ms.forEach(function(m) {
            if (m.addedNodes.length > 0) {
                //console.log(m.addedNodes.className);
                console.log(m.addedNodes);
                for(l=0; l<m.addedNodes.length; l++){
                    console.log(m.addedNodes[l].getElementsByClassName( "_3hi clearfix" ));
                    var cfx = m.addedNodes[l].getElementsByClassName( "_3hi clearfix" );
                    for(c=0; c<cfx.length; c++){
                      draw(cfx[c].firstChild.firstChild.firstChild);
                    }
                    //cfx = cfx.concat( m.addedNodes[l].getElementsByClassName( "_3hi clearfix" )[0] ); //Y I AM DUM?? 
                }
                console.log( "cfx: " + cfx );
                // cfx.forEach(function( p ) {
                  // console.log( p );
                  // // draw(p.getElementsByTagName( "p" )[0]);
                // });
                /*
                if (m.addedNodes.className === "webMessengerMessageGroup clearfix") { 
                //this returns an array with 18 items where 1-17 are li containing text. 
                  console.log( "found: " + m.addedNodes );
                  
                    
                    //draw(m.addedNodes[0].firstChild.firstChild.firstChild);
                }
                */
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
