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


var start = "`~";
var stop = "~`";
var l = 2;

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

function draw( em ) {
    console.log( "em: "+ em)
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