var url = "https://check.torproject.org"
  , checker = null;

// listen for icon clicks
chrome.browserAction.onClicked.addListener(function(tab) {
  clearTimeout(checker);
  check();
  chrome.tabs.create({ url: url });
});

(function check() {
  var xhr = new XMLHttpRequest();
  var onStateChange = function() {
    var stat = 'not_connected';
    if(xhr.readyState === 4) {
      if(   xhr.status === 200
         && xhr.responseText.indexOf('Sorry') === -1) {
        stat = 'connected';
      }
      chrome.browserAction.setIcon({ path: { 38: '/icons/' + stat + '.png' } });
    }
    checker = setTimeout(check, 50000);
  };

  xhr.onreadystatechange = onStateChange;
  xhr.open("GET", url);
  xhr.send();
})();
