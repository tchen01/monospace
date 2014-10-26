var checkExist = setInterval(function() {
   if (document.getElementById("webMessengerRecentMessages")) {
      console.log("Exists!");
      monospaceInit();
      clearInterval(checkExist);
   }
}, 50);



function monospaceInit() {
    window.msgWindow = document.getElementById("webMessengerRecentMessages");
    detect();
    // msgWindow.addEventListener('DOMNodeInserted', update, false);
    //^ update to just draw new elements.
}

var start = "`~";
var stop = "~`";
var l = 2;

var text = [];

function detect() {
   var msgWindow = document.getElementById("webMessengerRecentMessages");
   //^ something still sketchy about this.

    //characters for codeblock
    

    var chat = msgWindow.getElementsByClassName("_38"); 
    // console.log( chat )
    //FB large chat specific
    for (i = chat.length-1; i >= 0; i--) {
        draw( chat[i].getElementsByTagName("p")[0] )
    }
    
    //FB small chat specific
    var miniWindow = document.getElementById("ChatTabsPagelet");
    console.log( miniWindow );
    var mini_chat = miniWindow.getElementsByTagName("tbody"); //_5ys_ _5wdf
    var mini_chat = mini_chat[0].getElementsByClassName("_5wdf");
    
    console.log("minichat: " + mini_chat[0] );
    
    for( i = mini_chat.length-1; i>=0; i--){
        texts = mini_chat[i].childNodes[0].childNodes[0].childNodes
        chat = texts[0].childNodes
        console.log("chat"+chat.length + chat);

        if(chat.length < 2){
            texts[0].innerHTML = "<span class='chat'>"+ chat[0].innerText +"</span>"
        }else {
            var text = ""
            for(i=0; i < chat.length; i++){
                text += "<br/>" + chat[i].innerText;
                console.log( text );
                chat[i].outerHTML = "";
            }
            text = text.substring(5, text.length).replace("<br/><br/>", "<br/>");
            text = "<span class='chat'>"+ text +"</span>";
            console.log( text );
            texts[0].innerHTML = text;
        }
        texts[0].style.background = "red";
        console.log(texts[0]);
        draw( texts[0] );
    }
}

//run draw only on new element
function update(e) {
    // console.log("update");
    // console.log(e);
    if(true){
        detect();
    }
}


function draw( em ) {
    
    words = em.innerText;
    var stop_index = words.indexOf(stop);
    var start_index = words.indexOf(start);
    // console.log( words.indexOf( "\n" ), start_index, stop_index );

    if (stop_index > start_index && start_index > -1) {
        
        var newtext = words.substr(start_index + l, stop_index - start_index - l);
        var newtext = newtext.replace(/^[\r\n]+|[\r\n]+$/g,'');
        
        var numbers  = n_build();
        function n_build(){
            n = ""
            for(i=1; i<newtext.split('\n').length+1; i++){
                n += "<br/>" + i;
            }
            return n.substring(5, n.length);
         }
        
        em.className += " code";
        em.innerHTML = "<div class='numbers'>"+ numbers +"</div><pre class='text'>" + newtext + "</pre>";
        hljs.highlightBlock(em.getElementsByClassName( 'text' )[0]);
    }

}