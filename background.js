/**
 * background script for app.js code injection
 * @author Jesse Mu, Tyler Chen
 */

var script = document.createElement("script");

if (document.URL.indexOf("messages") === -1) {
    script.src = chrome.extension.getURL("app.js");
} else {
    script.src = chrome.extension.getURL("message.js");
}

document.head.appendChild(script);

var highlightjs = document.createElement("script");
highlightjs.src = chrome.extension.getURL("highlight/highlight.pack.js");
document.head.appendChild(highlightjs);
