/**
 * Saves options to chrome.storage 
 * @author Tyler Chen, Jesse Mu
 */
 
//todo:
//refresh drawing when del is updated.
//dynamically build styles in options.html from directory containing styles??
//user uploaded files
var hlStyleElement = document.getElementById('hl-style');
var delElement = document.getElementById('del-style');
var revCheck = document.getElementById('rev-check');
var revElement = document.getElementById('rev-style');
function saveOptions() {
    chrome.storage.sync.set({
        hlStyle: hlStyleElement.value,
        del: delElement.value,
        rev: revElement.value,
        revChecked: revCheck.checked,
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

// Restores default options to chrome.storage
function restoreOptions() {
    chrome.storage.sync.get({
        // Default settings
        hlStyle: 'default',
        del: '```',
        rev: '```',
        revChecked: false,
    }, function(items) {
        hlStyleElement.value = items.hlStyle;
        delElement.value = items.del;
        revElement.value = items.rev;
        revCheck.checked = items.revChecked;
    });
}

function restoreDefaults() {
    hlStyleElement.value = 'default';
    delElement.value = '```';
    revElement.value = '```';
    revCheck.checked = false;
    saveOptions();
    
    var status = document.getElementById('restore-status');
    status.classList.add('alerting');
    setTimeout(function() {
        status.classList.remove('alerting');
    }, 2000);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', restoreDefaults);
