var checker = "https://check.torproject.org";

// listen for icon clicks
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({ url: checker });  
});

(function check() {
  var xhr = new XMLHttpRequest();
  var onStateChange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var resp = xhr.responseText
        , stat = resp.indexOf('Sorry') === -1 ? 'connected' : 'not_connected';
      chrome.browserAction.setIcon({ path: '/icons/' + stat + '.png' });
    } 
    setTimeout(check, 50000);
  };

  xhr.onreadystatechange = onStateChange;
  xhr.open("GET", checker);
  xhr.send();
})();
