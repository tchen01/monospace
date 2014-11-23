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

//customizable variables
var del = "```";
var rev = del.split('').reverse().join('');


//draws on code blocks when large chat is updated
//should only be used on https://www.facebook.com/messages
function monospaceListen() {
    var monospaceObserver = new MutationObserver(function(ms) {
        ms.forEach(function(m) {
            if (m.addedNodes.length > 0) { //do we even need this part?
                console.log(m.addedNodes);
                for(l=0; l<m.addedNodes.length; l++){
                   
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

//I believe that these functions should work in the small chat as is
function nBuild(nt) {
  n = "";
  for (m = 0; m < nt.split('<br/>').length; m++) {
      n += "<br/>" + (m + 1);
  }
  return n.substring(5, n.length);
}


function draw(em) {
  html = em.innerHTML;
  var stop_index = html.lastIndexOf(rev);
  var start_index = html.indexOf(del);

  if (stop_index > start_index && start_index > -1) {
    em.innerHTML = write(html);
    var code = em.getElementsByTagName( "pre" );
    for(var i=0; i<code.length; i++){
      console.log( code[i] );
      hljs.highlightBlock( code[i] );
    }
  }
}

//write: string -> string
//takes innterHTML of parent element of %p tag(s) and formats to code style blocks 
//http://jsfiddle.net/m9eLk17a/1/  
function write(t){
  console.log(t);
  var text = t.replace(del+"\n", del).replace("\n" + rev, rev).replace(/\n/g, "<br/>").replace(/<\/p><p>/g, "<br/><br/>").replace(/<\/p>|<p>/g,""); 
  // replacing del+"\n" removes line breaks after a code block if del === rev. better way to handle this is probably to remove them at the end.
  
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
              newtext += "<div class='code inline'>";
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
    newtext += "<p class='inline'>" + text_hold + code_hold + "</p>";
    newtext = newtext.replace(/<p class='inline'><\/p>/g, "");
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
