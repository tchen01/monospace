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
    msgWindow.addEventListener('DOMNodeInserted', update, false);
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

    //FB large chat specific
    for (i = chat.length-1; i >= 0; i--) {
        draw( chat[i].getElementsByTagName("p")[0] )
    }
}

//run draw only on new element
function update(e) {
    console.log("update");
    console.log(e);
    if(true){
        detect();
    }
}

function copy(e){
    console.log("!!!");    
}

function draw( em ) {
    em.addEventListener("click", copy, false);
    
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