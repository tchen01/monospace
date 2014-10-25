monospaceInit();

function monospaceInit() {
    window.msgWindow = document.getElementById("webMessengerRecentMessages");
    detect();
    msgWindow.addEventListener('DOMNodeInserted', detect, false);
    //^ update to just draw new elements.
}

var start = "`~ ";
var stop = " ~`";
var l = 3;

var text = [];
    
function detect() {
   var msgWindow = document.getElementById("webMessengerRecentMessages");
   //^ something still sketchy about this.

    //characters for codeblock
    

    var chat = msgWindow.getElementsByClassName("_38"); 

    //FB large chat specific
    for (i = 0; i < chat.length; i++) {
        draw( chat[i].getElementsByTagName("p")[0] )
    }
}


function draw( em ) {
    words = em.innerText;
    var stop_index = words.indexOf(stop);
    var start_index = words.indexOf(start);
    console.log( words.indexOf( "\n" ), start_index, stop_index );

    if (stop_index > start_index && start_index > -1) {
            console.log( words.substring(start_index + l, stop_index) );
        
        var newtext = words.substr(start_index + l, stop_index - start_index - l);
        var numbers  = n_build();
        function n_build(){
            n = ""
            for(i=1; i<newtext.split('\n').length+1; i++){
                console.log( i );
                n += "<br/>" + i;
                console.log( n );
            }
            return n.substring(5, n.length);
         }
        
        em.className += " code";
        em.innerHTML = "<div class='numbers'>"+ numbers +"</div><div class='text'>" + newtext + "</div>";
    }

}