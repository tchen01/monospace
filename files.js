if (document.body.childElementCount === 1) { //check if on chrome's file display page
    chrome.storage.sync.get(function(items) {
        var whiteList = items.whitelist;
        var url = document.URL;
        for (var i = 0; i < whiteList.length; i++) {
            if (url.indexOf(whiteList[i].replace("*", "")) > -1) {
                highlight();
                break;
            }
        }
    });
}

function highlight() {
    var style = document.createElement("link");
    style.rel = "stylesheet";
    style.id = "monospaceStyles";
    style.href = chrome.extension.getURL("highlight/styles/default.css");
    document.head.appendChild(style);
    var monospaceStyles = document.getElementById('monospaceStyles');

    function updateStyles() {
        chrome.storage.sync.get(function(e) {
            monospaceStyles.href = chrome.extension.getURL("highlight/styles/" + e.hlStyle + ".css");

            if (e.numbers === true) {
                num.style.display = "none";
            } else {
                num.style.display = "inline-block";
            }
        });
    }

    chrome.storage.onChanged.addListener(function(changes, namespace) {
        updateStyles();
    });

    updateStyles();

    document.body.classList.add("hljs");

    pre = document.getElementsByTagName('pre')[0];
    text = pre.innerText.substring(0, pre.innerText.length - 1);

    document.body.innerHTML = "<div class='code' style='font-size:12pt; line-height: 1em;'><div class='numbers'>" + nBuild(text) + "</div><pre style='padding-left: 0.5em;width: 95%;overflow-x: scroll; overflow-y: hidden;'></pre></div>"
    //update this to a better method?

    num = document.getElementsByClassName('numbers')[0];
    pre = document.getElementsByTagName('pre')[0];
    pre.innerText = text;
    hljs.highlightBlock(pre);
}
