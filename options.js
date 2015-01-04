// Saves options to chrome.storage

//todo:
//refresh drawing when del is updated.
//dynamically build styles in options.html??
var hlStyleElement = document.getElementById('hl-style');
var delElement = document.getElementById('del-style');
function saveOptions() {
    chrome.storage.sync.set({
        hlStyle: hlStyleElement.value,
        del: delElement.value,
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
     

// Restores default options to chrome.storage
function restoreOptions() {
    chrome.storage.sync.get({
        // Default settings
        hlStyle: 'default',
        del: '```',
    }, function(items) {
        hlStyleElement.value = items.hlStyle;
        delElement.value = items.del;
    });
}

function restoreDefaults() {
    var status = document.getElementById('restore-status');
    status.classList.add('alerting');
    setTimeout(function() {
        status.classList.remove('alerting');
    }, 2000);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', restoreDefaults);
