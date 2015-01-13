/**
 * Saves options to chrome.storage 
 * @author Tyler Chen, Jesse Mu
 */
 
//todo:
//refresh drawing when del is updated.
//dynamically build styles in options.html from directory containing styles??
var hlStyleElement = document.getElementById('hl-style');
var delElement = document.getElementById('del-style');
var revCheck = document.getElementById('rev-check');
var revElement = document.getElementById('rev-style');
var numCheck = document.getElementById('num-check');
var whitelistElement = document.getElementById('whitelist-style');
var wlInput = document.getElementById('wlinput-style');
var addButton = document.getElementById('whitelist-add');
var removeButton = document.getElementById('whitelist-remove');

var style = document.createElement("link");
style.rel = "stylesheet";
style.id = "monospaceStyles";
document.head.appendChild(style);
var monospaceStyles = document.getElementById('monospaceStyles');

function saveOptions() {
    monospaceStyles.href = chrome.extension.getURL("highlight/styles/" + hlStyleElement.value + ".css");
    whiteList = [];
    for(var i=0; i<whitelistElement.childElementCount; i++){
        whiteList.push(whitelistElement.children[i].value);
    }
    chrome.storage.sync.set({
        hlStyle: hlStyleElement.value,
        del: delElement.value,
        rev: revElement.value,
        revChecked: revCheck.checked,
        numbers: numCheck.checked, //false if visible
        whitelist: whiteList, //grab from whitelistElement //do we want to use *??
    }, function() {
    
        // Update status to let user know options were saved.
        var status = document.getElementById('save-status');
        status.textContent = 'Options saved.';
        status.classList.add('alerting');
        setTimeout(function() {
            status.classList.remove('alerting');
        }, 2000);
    });
}

delElement.addEventListener('blur', function(){
    if( !revCheck.checked ){
        revElement.value = delElement.value.split('').reverse().join('');
    }
});

addButton.addEventListener('click', function(){
    var opt = document.createElement('option');
    opt.value = wlInput.value;
    opt.innerHTML = wlInput.value;
    whitelistElement.appendChild(opt);
    whitelistElement.size += 1;
});

removeButton.addEventListener('click', function(){
    whitelistElement.removeChild(whitelistElement.children[whitelistElement.selectedIndex]);
    whitelistElement.size -= 1;
});


// Restores default options to chrome.storage
function restoreOptions() {
    chrome.storage.sync.get({
        // Default settings
        hlStyle: 'default',
        del: '```',
        rev: '```',
        revChecked: false,
        numbers: false,
        whitelist: ["facebook.com", "*.js", "*.css", "*.py"],
    }, function(items) {
        hlStyleElement.value = items.hlStyle;
        delElement.value = items.del;
        revElement.value = items.rev;
        revCheck.checked = items.revChecked;
        numCheck.checked = items.numbers
        for(var i = 0; i<items.whitelist.length; i++){
            var opt = document.createElement('option');
            opt.value = items.whitelist[i];
            opt.innerHTML = items.whitelist[i];
            whitelistElement.appendChild(opt);
        }
        whitelistElement.size = Math.min(8,items.whitelist.length);
        monospaceStyles.href = chrome.extension.getURL("highlight/styles/" + items.hlStyle + ".css");
        
    });
}

function restoreDefaults() {
    chrome.storage.sync.set({
        hlStyle: "default",
        del: "```",
        rev: "```",
        revChecked: false,
        numbers: false, //false if visible
        whitelist: ["facebook.com", "*.js", "*.css", "*.py"], //grab from whitelistElement //do we want to use *??
    })
    restoreOptions();
    
    var status = document.getElementById('restore-status');
    status.classList.add('alerting');
    setTimeout(function() {
        status.classList.remove('alerting');
    }, 2000);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', restoreDefaults);
