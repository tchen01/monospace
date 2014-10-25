//probably should loop this or is there a better way to detect DOM changes?
window.addEventListener ("load", myMain, false);
document.addEventListener('DOMNodeInserted', myMain, false);

function myMain (evt) {
  
  console.log( "hello" );
  //characters for codeblock
  var start = "`~ "; 
  var stop = " ~`";
  
  //main chat
  var chat = document.getElementsByClassName( "_38" );
  for(i=0;i<chat.length;i++){
    text = chat[i].getElementsByTagName( "p" )[0];
    // console.log( text );
    words = chat[i].innerText
    // console.log(words + "contains lol? : " + words.indexOf( "lol" ) );
    var stop_index = words.indexOf(stop);
    var start_index = words.indexOf(start);
    if( stop_index > start_index && start_index > -1 ){
      text.className += " code";
      text.innerText = words.substr(start_index+3, stop_index-start_index-3) ;
    }
  }
  
  //small chat
  // var mini = document.getElementsByClassName( "conversation" );
  // for(i=0;i<mini.length;i++){
    // words = mini[i].innerText
    // console.log(words)
    // var stop_index = words.indexOf(stop);
    // var start_index = words.indexOf(start);
    // if( stop_index > start_index && start_index > -1 ){
      // words.className += " code";
      // words.innerText = words.substr(start_index+3, stop_index-start_index-3) ;
    // }
  // }

}