/**
 * background script for app.js code injection
 * @author Jesse Mu, Tyler Chen
 */
 
var script = document.createElement("script");
script.id = 'monospace';
script.src = chrome.extension.getURL("app.js");
document.head.appendChild(script);

var monospace = document.getElementById('monospace');

//inject css page rather than having it as a content script?
var highlightjs = document.createElement("script");
highlightjs.src = chrome.extension.getURL("highlight/highlight.pack.js");
document.head.appendChild(highlightjs);

//re-inject script (and appropriate CSS file) on update or have listener in app.js?
chrome.storage.onChanged.addListener(function(changes, namespace) {
    updateVars()
    for (key in changes) {
      var storageChange = changes[key];
      console.log('Storage key "%s" in namespace "%s" changed. ' + 'Old value was "%s", new value is "%s".', key, namespace,storageChange.oldValue,storageChange.newValue);}
    });

function updateVars(){
    chrome.storage.sync.get(function(e){
        console.log( e );
        var vars = '';
        for (var key in e) {
            vars += '"' + key + '":"' + e[key] + '",';
        }
        monospace.setAttribute('data-vars', vars);
    }); 
}

updateVars();




