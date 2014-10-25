window.addEventListener ("load", myMain, false);

function myMain (evt) {

  console.log( "hello" );
  var chat = document.getElementsByClassName( "_38 direction_ltr" );
  console.log( chat );
  //characters for codeblock
  var start = "`~ "; 
  var stop = " ~`";
  
  for(i=0;i<chat.length;i++){
    text = chat[i].getElementsByTagName( "p" )[0];
    console.log( text );
    words = chat[i].innerText
    // console.log(words + "contains lol? : " + words.indexOf( "lol" ) );
    var stop_index = words.indexOf(stop);
    var start_index = words.indexOf(start);
    if( stop_index > start_index && start_index > -1 ){
      text.className += " code";
      text.innerText = words.substr(start_index+3, stop_index-start_index-3) ;
    }
  }

}