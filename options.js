// Saves options to chrome.storage

//todo:
//set current del/style as value attribute for respective forms
//refresh drawing when del is updated.
//dynamically build styles in options.html??

function saveOptions() {
    var hlStyle = document.getElementById('hl-style').value;
    var delValue = document.getElementById('del-style').value;
    chrome.storage.sync.set({
        hlStyle: hlStyle,
        del: delValue,
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
        document.getElementById('hl-style').value = items.hlStyle;
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
