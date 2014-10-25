window.addEventListener("load", detect, false);
document.getElementById("webMessengerRecentMessages").addEventListener('DOMNodeInserted', detect, false); 

function detect(evt) {

    console.log("hello");
    //characters for codeblock
    var start = "`~ ";
    var stop = " ~`";

    //main chat only. small chat splits lines into seperate elements...
    var chat = document.getElementsByClassName("_38"); //what is the exact meanning of _38???
    for (i = 0; i < chat.length; i++) {
        text = chat[i].getElementsByTagName("p")[0];
        // console.log( text );
        words = chat[i].innerText
        // console.log(words + "contains lol? : " + words.indexOf( "lol" ) );
        var stop_index = words.indexOf(stop);
        var start_index = words.indexOf(start);
        if (stop_index > start_index && start_index > -1) {
            text.className += " code";
            text.innerText = words.substr(start_index + 3, stop_index - start_index - 3);
        }
    }
}
