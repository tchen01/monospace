/**
 * Observe DOM mutations and convert monospace code blocks
 * @author Tyler Chen, Jesse Mu
 */
getVars();

var SMobserverConfig = {
    childList: true,
    subtree: true, 
    characterData: false, 
    attributes: false
};

//draws on code blocks when large chat is updated
function SMmonospaceListen() {
    var SMmonospaceObserver = new MutationObserver(function(ms) {
         ms.forEach(function(m){
            if( m.addedNodes.length > 0){
              if( typeof( m.addedNodes[0].className ) === 'string' ){ //makes sure we can get elements from m.addedNodes[0] (could be a better way)
                if( m.addedNodes[0].className.indexOf( '_5wd4' ) > -1 ){
                  var cfx = m.addedNodes[0].getElementsByClassName( '_5wdf' );
                  for(c=0; c<cfx.length; c++){
                    cfx[c].firstChild.firstChild.innerText = cfx[c].firstChild.firstChild.innerText.replace(/\n{2,}/g, "\n\n");
                    draw(cfx[c].firstChild.firstChild);
                  }
                }
              }
            }
        });
    });
    SMmonospaceObserver.observe(document.getElementById('ChatTabsPagelet'), SMobserverConfig);
}


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