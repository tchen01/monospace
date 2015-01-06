/**
 * background script for app.js code injection
 * @author Jesse Mu, Tyler Chen
 */

var highlightjs = document.createElement("script");
highlightjs.src = chrome.extension.getURL("highlight/highlight.pack.js");
document.head.appendChild(highlightjs);

var script = document.createElement("script");
script.id = 'appJS';
script.src = chrome.extension.getURL("app.js");
document.head.appendChild(script);

var appJS = document.getElementById('appJS');


if (document.URL.indexOf("messages") !== -1) {
    var msg = document.createElement("script");
    msg.id='messageJS'
    msg.src = chrome.extension.getURL("message.js");
    document.head.appendChild(msg);
}

var style = document.createElement("link");
style.rel = "stylesheet";
style.id = "monospaceStyles";
style.href = chrome.extension.getURL("highlight/styles/dark.css");
document.head.appendChild(style);

// theme .hljs css needs to be updated for each theme (see dark.css) or overridden in main.css 
var monospaceStyles = document.getElementById('monospaceStyles');

chrome.storage.onChanged.addListener(function(changes, namespace) {
    updateVars()
    for (key in changes) {
      var storageChange = changes[key];
    }
});

function updateVars(){
    chrome.storage.sync.get(function(e){
        var vars = '';
        for (var key in e) {
            vars += '"' + key + '":"' + e[key] + '",';
        }
        appJS.setAttribute('data-vars', vars);
        
        var obj = appJS.getAttribute('data-vars');
        var obj = obj.substring(0, obj.length - 1);
        var obj = JSON.parse("{" + obj + "}");
        
        //reinject JS here if del changes?
        monospaceStyles.href = chrome.extension.getURL("highlight/styles/" + obj.hlStyle + ".css");
    });
}

updateVars();




