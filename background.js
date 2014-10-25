/**
 * background script for app.js code injection
 * @author Jesse Mu, Tyler Chen
 */

var script = document.createElement("script");
script.src = chrome.extension.getURL("app.js");
document.head.appendChild(script);
