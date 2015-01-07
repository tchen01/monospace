var style = document.createElement("link");
style.rel = "stylesheet";
style.id = "monospaceStyles";
style.href = chrome.extension.getURL("highlight/styles/dark.css");
document.head.appendChild(style);
var monospaceStyles = document.getElementById('monospaceStyles');

chrome.storage.onChanged.addListener(function(changes, namespace) {
    updateVars();
});

function updateVars(){
    chrome.storage.sync.get(function(e){
        monospaceStyles.href = chrome.extension.getURL("highlight/styles/" + e.hlStyle + ".css");
    });
}

updateVars();

pre = document.getElementsByTagName( 'pre' )[0];
text = pre.innerText;

document.body.classList.add("hljs");
document.body.innerHTML = "<div class='code' style='font-size:12pt; line-height: 1em;'><div class='block_container'><div class='numbers'>" + nBuild( text.replace(/\n/g, "<br/>") ) +"</div><pre class='text'></pre></div></div>"

pre = document.getElementsByTagName( 'pre' )[0];
pre.innerText = text;
hljs.highlightBlock( pre );