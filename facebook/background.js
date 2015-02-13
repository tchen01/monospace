/**
 * background script for app.js code injection
 * @author Tyler Chen, Jesse Mu
 */
 
chrome.storage.sync.get(function(items){
    var whiteList = items.whitelist;
    for(var i=0; i<whiteList.length; i++){
        if(whiteList[i] === "facebook.com"){
            inject();
            var observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                console.log(mutation.type);
                if(mutation.type === "attributes"){
                    console.log('switch page');
                    scriptInject();
                }
              });    
            });

            var config = { attributes: true, childList: true, characterData: true };

            observer.observe(document.body, config);
            break;
        }
    }
});

function inject(){
    var highlightjs = document.createElement("script");
    highlightjs.src = chrome.extension.getURL("highlight/highlight.pack.js");
    document.head.appendChild(highlightjs);

    var script = document.createElement("script");
    script.id = 'appJS';
    script.src = chrome.extension.getURL("app.js");
    document.head.appendChild(script);

    var appJS = document.getElementById('appJS');

    var facebook = document.createElement("script");
    facebook.id = 'facebookJS';
    facebook.src = chrome.extension.getURL("facebook/facebook.js");
    document.head.appendChild(facebook);
    
    scriptInject();

    var style = document.createElement("link");
    style.rel = "stylesheet";
    style.id = "monospaceStyles";
    style.href = chrome.extension.getURL("highlight/styles/dark.css");
    document.head.appendChild(style);

    var monospaceStyles = document.getElementById('monospaceStyles');

    chrome.storage.onChanged.addListener(function(changes, namespace) {
        updateVars()
        for (key in changes) {
          var storageChange = changes[key];
        }
    });
    updateVars();
}

function scriptInject(){
    if(document.getElementById('messageJS') !== null){
        document.getElementById('messageJS').remove();
    }

    
    if (document.URL.indexOf("messages") !== -1) {
        var msg = document.createElement("script");
        msg.id='messageJS'
        msg.src = chrome.extension.getURL("facebook/message.js");
        document.head.appendChild(msg);
    }
}


function updateVars(){
    chrome.storage.sync.get(function(e){
        var vars = '';
        for (var key in e) {
            vars += '"' + key + '":"' + e[key] + '",';
        }
        appJS.setAttribute('data-vars', vars);
        
        var obj = appJS.getAttribute('data-vars');
        var obj = obj.substring(0, obj.length - 1);
        var obj = JSON.parse("{" + obj + "}");
        
        //reinject JS here if settings change?
        monospaceStyles.href = chrome.extension.getURL("highlight/styles/" + obj.hlStyle + ".css");
    });
}


