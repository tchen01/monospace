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
                    // if( cfx[c].firstChild.firstChild.className !== "_5y15 monospaced" ){ //i think this is redundant since messages are not refreshed.
                        cfx[c].firstChild.firstChild.innerHTML = cfx[c].firstChild.firstChild.innerHTML.replace(/<br(.*?)">/g, "<br>").replace(/(<br>){3,}/g, "<br><br>"); //probably could be reduced to one regex if I were a regex pro
                        draw(cfx[c].firstChild.firstChild);
                    // }
                  }
                }
              }
            }
        });
    });
    SMmonospaceObserver.observe(document.getElementById('ChatTabsPagelet'), SMobserverConfig);
}


function SMinitialDraw(){
    var cfx = document.getElementsByClassName( "_5wdf" );
    for(c=0; c<cfx.length; c++){
        cfx[c].firstChild.firstChild.innerHTML = cfx[c].firstChild.firstChild.innerHTML.replace(/<br(.*?)">/g, "<br>").replace(/(<br>){3,}/g, "<br><br>");
        draw(cfx[c].firstChild.firstChild);
    }
}

var SMcheckForMsg = setInterval(function() {
    var SMmsgWindow = document.getElementById('ChatTabsPagelet');
    if (SMmsgWindow !== null) {
        console.log('found!');
        SMinitialDraw();
        SMmonospaceListen(SMmsgWindow, SMobserverConfig);
        clearInterval(SMcheckForMsg);
    }
}, 50);