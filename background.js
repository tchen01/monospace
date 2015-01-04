/**
 * background script for app.js code injection
 * @author Jesse Mu, Tyler Chen
 */

var script = document.createElement("script");
script.id = 'monospace';
script.src = chrome.extension.getURL("app.js");
document.head.appendChild(script);

if (document.URL.indexOf("messages") !== -1) {
    var msg = document.createElement("script");
    msg.src = chrome.extension.getURL("message.js");
    document.head.appendChild(msg);
}


var highlightjs = document.createElement("script");
highlightjs.src = chrome.extension.getURL("highlight/highlight.pack.js");
document.head.appendChild(highlightjs);
