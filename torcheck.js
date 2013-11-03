var checker = "https://check.torproject.org";

// listen for icon clicks
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({ url: checker });  
});

(function check() {
  var xhr = new XMLHttpRequest();
  var onStateChange = function() {
    var stat = 'not_connected';
    if(xhr.readyState === 4) {
      if(   xhr.status === 200
         && xhr.responseText.indexOf('Sorry') !== -1) {
        stat = 'connected';
      }
      chrome.browserAction.setIcon({ path: { 38: '/icons/' + stat + '.png' } });
    }
    setTimeout(check, 50000);
  };

  xhr.onreadystatechange = onStateChange;
  xhr.open("GET", checker);
  xhr.send();
})();
