var style = document.createElement("link");
style.rel = "stylesheet";
style.id = "monospaceStyles";
style.href = chrome.extension.getURL("highlight/styles/default.css");
document.head.appendChild(style);
var monospaceStyles = document.getElementById('monospaceStyles');

function updateStyles(){
    chrome.storage.sync.get(function(e){
        monospaceStyles.href = chrome.extension.getURL("highlight/styles/" + e.hlStyle + ".css");

        if( e.numbers === true ){
        num.style.display = "none";
        } else {
        num.style.display = "inline-block";
        }
    });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
    updateStyles();
});

updateStyles();

document.body.classList.add("hljs");

pre = document.getElementsByTagName( 'pre' )[0];
text = pre.innerText;

document.body.innerHTML = "<div class='code' style='font-size:12pt; line-height: 1em;'><div class='numbers'>" + nBuild( text.replace(/\n/g, "<br/>") ) +"</div><pre></pre></div>"
//update this to a better method.

num = document.getElementsByClassName( 'numbers' )[0];
pre = document.getElementsByTagName( 'pre' )[0];
pre.innerText = text;
hljs.highlightBlock( pre );

