var check_miniExist = setInterval(function() {
   if (document.getElementById("ChatTabsPagelet")) {
      console.log("mini Exits!");
      // monospace_miniInit();
      clearInterval(check_miniExist);
   }
}, 100);


function monospace_miniInit() {
    clearInterval(check_miniExist);
    window.miniWindow = document.getElementById("ChatTabsPagelet");

    detect_mini();
    miniWindow.addEventListener('DOMNodeInserted', update, false);
}


var del = "```";
var rev = "```"; //dynamically reverse del


var text = "";

//this draws all code snippets for small chat
//this does not need to be run every time a new chat is made

//use mutation observer to see new _5wdf class elements then run
//the for loop with j=0
function detect_mini(){
    //FB small chat specific
    var miniWindow = document.getElementById("ChatTabsPagelet");
    var chats = miniWindow.getElementsByTagName("tbody"); 
    
    console.log("minichat: " + chats.length );
    for( i = chats.length-1; i>=0; i--){
        var mini_chat = chats[i].getElementsByClassName( "_5wdf" );
        
        for( j = 0; j < mini_chat.length; j++){
            cont = mini_chat[j].firstElementChild.firstElementChild;// _5y15 (i think)
            
            console.log( cont );
            if( cont.getElementsByClassName('code').length > 0 ) break;
            
            text = cont.innerText;
            console.log( text );
            cont.innerHTML =  "<div><p class='mchat'>" + text + "</p></div>";
            if( cont.getElementsByTagName("p")[0] != 'undefined'){
                draw( cont.getElementsByTagName("p")[0] )
            }
        } 
    }
    

}


function update_mini(e){
    detect_mini();
}

function nBuild(newtext) {
    n = "";
    for (m = 1; m < newtext.split('\n').length + 1; m++) {
        n += "<br/>" + m;
    }
    return n.substring(5, n.length);
}

function draw(em) {
    text = em.innerText;
    console.log( text );
    var stop_index = text.lastIndexOf(rev);
    var start_index = text.indexOf(del);

    if (stop_index > start_index && start_index > -1) {
        var regexExpression = "("+del+"|"+rev+")";
        var regex = new RegExp(regexExpression, "g");
        var texts = text.split( regex );
        var codes = text.match( regex );
        
        var newtext = "";
        var text_hold = "";
        var code_hold = "";
        var state = 0; //1: after code start delimiter but before stop
        var words = text.split( regex );
        console.log( words );
        
        //http://jsfiddle.net/m9eLk17a/1/
        function write(){
          for(i = 0; i < words.length; i++){
              if( state == 0){
                if( words[i] == del){
                    newtext += "<p>" + text_hold + "</p>";
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
                      newtext += "<div class='code'><div class='numbers'>" + nBuild( code_hold ) +"</div>";
                    }
                    newtext += "<pre class='text'>" + code_hold + "</pre></div>";
                    console.log( code_hold );
                    state = 0;
                    code_hold = "";
                    } else {
                        code_hold += words[i];
                    }
                }
            }
            newtext += "<p>" + text_hold + code_hold + "</p>"; //would prefern not to change <p> to inline. Either add class or change tag
            console.log( newtext );
        }
        write();

       /* IMPORTANT */
        //how do <p> get into %div.code???
        //running refresh too many times and not ignoring drawn sections?
        
        em.outerHTML = newtext;
        console.log( em );
    }
}