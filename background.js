monospaceInit();

function monospaceInit() {
    window.msgWindow = document.getElementById("webMessengerRecentMessages");
    detect();
    msgWindow.addEventListener('DOMNodeInserted', detect, false);
}

var start = "`~ ";
var stop = " ~`";
var l = 3;

var text = [];
    
function detect() {
   var msgWindow = document.getElementById("webMessengerRecentMessages");

    //characters for codeblock
    

    //main chat only. small chat splits lines into seperate elements...
    var chat = msgWindow.getElementsByClassName("_38"); 
    //^what is the exact meanning of _38???
    
    for (i = 0; i < chat.length; i++) {
        text[i] = chat[i].getElementsByTagName("p")[0];
    }
    //console.log( text, chat );
    draw( chat ); //really should be text but i'm having issues making text array
}

//takes array of elements containing possible code blocks and edits appropriate ones
function draw( em ) {
    for (i = 0; i < em.length; i++) {
        text = em[i];
        words = em[i].textContent;
        var stop_index = words.indexOf(stop);
        var start_index = words.indexOf(start);
        console.log( words.indexOf( "\n" ), start_index, stop_index );

        if (stop_index > start_index && start_index > -1) {
                console.log( words.substr(start_index + l, stop_index - start_index - l) );
            
            var newtext = words.substr(start_index + l, stop_index - start_index - l);
            //need to detect returns and replace with "<br/>" and then create numbers accordingly
            var numbers  = "1\n2";
            
            text.className += " code";
            text.innerHTML = "<div class='numbers'>"+ numbers +"</div><div class='text'>"words.substr(start_index + l, stop_index - start_index - l)"</div>";
        }
    }

}