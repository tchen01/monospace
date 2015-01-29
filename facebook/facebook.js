/**
 * Observe DOM mutations and convert monospace code blocks
 * @author Tyler Chen, Jesse Mu
 */

var SMobserverConfig = {
    childList: true,
    subtree: true, 
    characterData: false, 
    attributes: false
};

getVars();

// UPDATE TO MATCH FORMAT OF MESSAGE.JS

//draws on code blocks when large chat is updated
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
                    cfx[c].firstChild.firstChild.innerText = cfx[c].firstChild.firstChild.innerText.replace(/\n{2,}/g, "\n\n");
                    draw(cfx[c].firstChild.firstChild);
                  }
                }
              }
            }
        }
    });
    SMmonospaceObserver.observe(document.getElementById('ChatTabsPagelet'), SMobserverConfig);
}

// function SMmonospaceListen() {
    // var SMmonospaceObserver = new MutationObserver(function(ms) {
        // ms.forEach(function(m) {
            // if (m.addedNodes.length > 0) { //do we even need this part?
                // console.log(m.addedNodes);
                // for(l=0; l<m.addedNodes.length; l++){
                    // var cfx = m.addedNodes[l].getElementsByClassName( "_5wdf" );
                    // for(c=0; c<cfx.length; c++){
                        // cfx[c].firstChild.firstChild.innerText = cfx[c].firstChild.firstChild.innerText.replace(/\n{2,}/g, "\n\n");
                        // draw(cfx[c].firstChild.firstChild);
                      // //%div._38 -> %span -> %p
                    // }
                // }
            // }
        // });
    // });
    // SMmonospaceObserver.observe(document.getElementById('ChatTabsPagelet'), SMobserverConfig);
// }

function SMcode(){
    var cfx = document.getElementsByClassName( "_5wdf" );
    for(c=0; c<cfx.length; c++){
        cfx[c].firstChild.firstChild.innerText = cfx[c].firstChild.firstChild.innerText.replace(/\n{2,}/g, "\n\n");
        draw(cfx[c].firstChild.firstChild);
    }
}

var SMcheckForMsg = setInterval(function() {
    var SMmsgWindow = document.getElementById('ChatTabsPagelet');
    if (SMmsgWindow !== null) {
        console.log('found!');
        SMcode();
        SMmonospaceListen(SMmsgWindow, SMobserverConfig);
        clearInterval(SMcheckForMsg);
    }
}, 50);