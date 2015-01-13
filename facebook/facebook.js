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

getVars();

//draws on code blocks when large chat is updated
//should only be used on https://www.facebook.com/messages
function SMmonospaceListen() {
    var SMmonospaceObserver = new MutationObserver(function(ms) {
        // console.log(ms);
        for(var m = 0; m<ms.length; m++){
            // console.log(ms[m].addedNodes);
            if( ms[m].addedNodes.length > 0){
              // console.log( typeof( ms[m].addedNodes[0].className ) );
              if( typeof( ms[m].addedNodes[0].className ) === 'string' ){
                if( ms[m].addedNodes[0].className.indexOf( '_5wd4' ) > -1 ){
                  // console.log( ms[m].addedNodes[0] );
                  var cfx = ms[m].addedNodes[0].getElementsByClassName( '_5wdf' );
                  // console.log( cfx );
                  for(c=0; c<cfx.length; c++){
                    // console.log( cfx[c].firstChild.firstChild );
                    // cfx[c].firstChild.firstChild.innerText = cfx[c].firstChild.firstChild.innerText.replace(/\n{2,}/g, "\n\n"); too slow??
                    draw(cfx[c].firstChild.firstChild);
                  }
                }
              }
            }
        }
    });
    SMmonospaceObserver.observe(document.getElementById('ChatTabsPagelet'), observerConfig);
}


var SMcheckForMsg = setInterval(function() {
    var SMmsgWindow = document.getElementById('ChatTabsPagelet');
    if (SMmsgWindow !== null) {
        console.log('found!');
        SMmonospaceListen(SMmsgWindow, observerConfig);
        clearInterval(SMcheckForMsg);
    }
}, 50);