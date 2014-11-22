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

var cfx = []; //ideally array containing all '_3hi clearfix' div 
//there is probably a way to avoid having to recreate this every mutation.

function monospaceListen() {
    var monospaceObserver = new MutationObserver(function(ms) {
        ms.forEach(function(m) {
            if (m.addedNodes.length > 0) { //do we even need this part?
                console.log(m.addedNodes);
                for(l=0; l<m.addedNodes.length; l++){
                    // console.log(m.addedNodes[l].getElementsByClassName( "_38" )); 
                    
                    //there is probably a quicker way to get these elements.
                    var cfx = m.addedNodes[l].getElementsByClassName( "_38" );
                    
                    for(c=0; c<cfx.length; c++){
                      draw(cfx[c].firstChild);
                      //%div._38 -> %span -> %p
                    }
                }
            }
        });
    });
    monospaceObserver.observe(document.getElementById('webMessengerRecentMessages'), observerConfig);
}

//this should return nothing if only one line
function nBuild(nt) {
    n = "";
    for (m = 0; m < nt.split('<br/>').length; m++) {
        n += "<br/>" + (m + 1);
    }
    return n.substring(5, n.length);
}

var del = "```";
var rev = del.split('').reverse().join('');



function draw(em) {
    html = em.innerHTML;
    var stop_index = html.lastIndexOf(rev);
    var start_index = html.indexOf(del);

    if (stop_index > start_index && start_index > -1) {
       em.innerHTML = write(html);
       hljs.highlightBlock( em );
       //we really only want to highlight the %pre.code. 
       //sometimes line numbers are colored if we do the entire block
    }
}


//i am unsure how much of this is specific to large facebook chat. 
//I think different chats will generally require slightly different write functions
//it can probably be generalized fairly easily once we know what the rest require

//write: string -> string
//takes innterHTML of parent element of %p tag(s) and formats to code style blocks 
//http://jsfiddle.net/m9eLk17a/1/  
function write(t){
  var text = t.replace(/\n/g, "<br/>").replace(/<\/p><p>/g, "<br/><br/>").replace(/<\/p>|<p>/g,""); 
  
  console.log( text );
  regexExpression = "("+del+"|"+rev+")";
  regex = new RegExp(regexExpression, "g");
  texts = text.split( regex );
  codes = text.match( regex );
  newtext = "";
  text_hold = "";
  code_hold = "";
  state = 0; //1: after code start delimiter but before stop
  words = text.split( regex );
  console.log( words );
  for(i = 0; i < words.length; i++){
      if( state == 0){
        if( words[i] == del){
            newtext += "<p class='inline'>" + text_hold + "</p>";
            state = 1;
            text_hold = "";
        } else {
            text_hold += words[i];
        }
    } else { //state == 1
        if( words[i] == rev ){
            num = nBuild( code_hold );
            if( num == 1){
              newtext += "<div class='code inline'>"; //linebreaks next to delimiter not transferring.
            } else {
              newtext += "<div class='code'><div class='block_container'><div class='numbers'>" + nBuild( code_hold ) +"</div>";
            }
            newtext += "<pre class='text'>" + code_hold + "</pre></div></div>";
            console.log( code_hold );
            state = 0;
            code_hold = "";
            } else {
                code_hold += words[i];
            }
        }
    }
    newtext += "<p class='inline'>" + text_hold + code_hold + "</p>"; //would prefer not to change <p> to inline. Either add class or change tag
    console.log( newtext );
    return newtext;
}
var checkForMsg = setInterval(function() {
    var msgWindow = document.getElementById('webMessengerRecentMessages');
    if (msgWindow !== null) {
        console.log('found!');
        monospaceListen(msgWindow, observerConfig);
        clearInterval(checkForMsg);
    }
}, 50);
