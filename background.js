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

var style = document.createElement("link");
style.rel = "stylesheet";
style.id = "monospaceStyles"
style.href = chrome.extension.getURL("highlight/styles/default.css");
document.head.appendChild(style);

var monospaceStyles = document.getElementById('monospaceStyles');

//change monospaceStyles.href on update.
//reinject script or have listener in app.js???
chrome.storage.onChanged.addListener(function(changes, namespace) {
    updateVars()
    for (key in changes) {
      var storageChange = changes[key];
      //console.log('Storage key "%s" in namespace "%s" changed. ' + 'Old value was "%s", new value is "%s".', key, namespace,storageChange.oldValue,storageChange.newValue);}
    });

function updateVars(){
    chrome.storage.sync.get(function(e){
        var vars = '';
        for (var key in e) {
            vars += '"' + key + '":"' + e[key] + '",';
        }
        monospace.setAttribute('data-vars', vars);
    }); 
}

updateVars();




