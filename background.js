/**
 * background script for app.js code injection
 * @author Jesse Mu, Tyler Chen
 */

var url = document.URL;
console.log( url.indexOf('messages') );
if( url.indexOf('messages') < 0 ){
    var script = document.createElement("script");
    script.src = chrome.extension.getURL("app.js");
    document.head.appendChild(script);
} else {
    var message = document.createElement("script");
    message.src = chrome.extension.getURL("message.js");
    document.head.appendChild(message);
}

var highlightjs = document.createElement("script");
highlightjs.src = chrome.extension.getURL("highlight/highlight.pack.js");
document.head.appendChild(highlightjs);
