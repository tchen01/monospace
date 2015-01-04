/**
 * background script for app.js code injection
 * @author Jesse Mu, Tyler Chen
 */

var highlightjs = document.createElement("script");
highlightjs.src = chrome.extension.getURL("highlight/highlight.pack.js");
document.head.appendChild(highlightjs);

var script = document.createElement("script");
script.id = 'monospace';
script.src = chrome.extension.getURL("app.js");
document.head.appendChild(script);

var monospace = document.getElementById('monospace');


if (document.URL.indexOf("messages") !== -1) {
    var msg = document.createElement("script");
    msg.src = chrome.extension.getURL("message.js");
    document.head.appendChild(msg);
}

var style = document.createElement("link");
style.rel = "stylesheet";
style.id = "monospaceStyles";
style.href = chrome.extension.getURL("highlight/styles/dark.css");
document.head.appendChild(style);

// theme .hljs css needs to be updated for each theme (see default.css) or overridden in main.css 
// background of code (and numbers) must be changed to match style even though hljs is not applied to them (put style for that block into each theme?)
var monospaceStyles = document.getElementById('monospaceStyles');

//change monospaceStyles.href on update.
//reinject script or have listener in app.js???
chrome.storage.onChanged.addListener(function(changes, namespace) {
    updateVars()
    for (key in changes) {
      var storageChange = changes[key];
      //console.log('Storage key "%s" in namespace "%s" changed. ' + 'Old value was "%s", new value is "%s".', key, namespace,storageChange.oldValue,storageChange.newValue);
    }
});

function updateVars(){
    chrome.storage.sync.get(function(e){
        var vars = '';
        for (var key in e) {
            vars += '"' + key + '":"' + e[key] + '",';
        }
        monospace.setAttribute('data-vars', vars);
        
        var obj = monospace.getAttribute('data-vars');
        var obj = obj.substring(0, obj.length - 1);
        var obj = JSON.parse("{" + obj + "}");

        monospaceStyles.href = chrome.extension.getURL("highlight/styles/" + obj.hlStyle + ".css");
    });
}

updateVars();




