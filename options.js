// Saves options to chrome.storage
function saveOptions() {
    var hlStyle = document.getElementById('hl-style').value;
    chrome.storage.sync.set({
        hlStyle: hlStyle,
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
    }, function(items) {
        document.getElementById('hl-style').value = items.hlStyle;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
