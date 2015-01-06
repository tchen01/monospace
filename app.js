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
                    draw(cfx[c].firstChild.firstChild);
                  }
                }
              }
            }
        }
    });
    SMmonospaceObserver.observe(document.getElementById('ChatTabsPagelet'), observerConfig);
}

function nBuild(nt) {
    n = "";
    for (m = 0; m < nt.split('<br/>').length; m++) {
        n += "<br/>" + (m + 1);
    }
    return n.substring(5, n.length);
}

var del;
var rev;
function getVars(){
    var monospace = document.getElementById('appJS');
    var obj = monospace.getAttribute('data-vars');
    var obj = obj.substring(0, obj.length - 1);
    var vars = JSON.parse("{" + obj + "}");
    del  = vars.del;
    rev = vars.rev;
}
getVars();

function draw(em) {
    html = em.innerText;
    var stop_index = html.lastIndexOf(rev);
    var start_index = html.indexOf(del);

    if (stop_index > start_index && start_index > -1) {
        // console.log("inside");
        em.innerHTML = write(html);
        var code = em.getElementsByTagName( "pre" );
        for(var i=0; i<code.length; i++){
            // console.log( code[i] );
            hljs.highlightBlock( code[i] );
        }
    }
}

//write: string -> string
//takes innterHTML of parent element of %p tag(s) and formats to code style blocks 
//http://jsfiddle.net/m9eLk17a/1/  
function write(t){
    console.log( t ) ;
    
    //this causes input such as: [ text\n```code```\ntext ] to be written to one line rather than 3
    //.replace(del+"\n", del).replace("\n" + rev, rev)
    var text = t.replace(/\n/g, "<br/>"); 
      
    console.log( text );
    var regexExpression = "("+del+"|"+rev+"|<br/>)";
    var regex = new RegExp(regexExpression, "g");
    var newtext = "";
    var text_hold = "";
    var code_hold = "";
    var state = 0; //1: after code start delimiter but before stop
    var words = text.split( regex ).filter(function(a){ return a !== ""; }); 
    console.log( words );
    for(i = 0; i < words.length; i++){
        if( state === 0){
            if( words[i] === del){
                newtext += "<p class='inline'>" + text_hold + "</p>";
                state = 1;
                text_hold = "";
            } else if(words[i] === "<br/>") {
                newtext += "<p class='inline'>" + text_hold + "</p><br/>";
                text_hold = "";
            } else {
                text_hold += words[i];
            }
        } else { //state == 1
            if( words[i] === rev ){
                num = nBuild( code_hold );
                if( num == 1){
                  newtext += "<div class='code inline'>";
                } else {
                  newtext += "<div class='code'><div class='block_container'><div class='numbers'>" + nBuild( code_hold ) +"</div>";
                }
                newtext += "<pre class='text'>" + code_hold + "</pre></div></div>";
                console.log( code_hold );
                state = 0;
                code_hold = "";
            } else if(words[i] === "<br/>") {
                if(words[i-1] === del || words[i+1] === rev){
                    console.log('skip');
                } else {
                    code_hold += words[i];
                }                
            } else{
                code_hold += words[i];
            }
        }
    }
    newtext += "<p class='inline'>" + text_hold + code_hold + "</p>";
    newtext = newtext.replace(/<p class='inline'><\/p>/g, "");
    console.log( newtext );
    return newtext;
}
var SMcheckForMsg = setInterval(function() {
    var SMmsgWindow = document.getElementById('ChatTabsPagelet');
    if (SMmsgWindow !== null) {
        console.log('found!');
        SMmonospaceListen(SMmsgWindow, observerConfig);
        clearInterval(SMcheckForMsg);
    }
}, 50);