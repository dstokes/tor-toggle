var url = "https://check.torproject.org"
  , checker = null;

// listen for icon clicks
chrome.browserAction.onClicked.addListener(function(tab) {
  clearTimeout(checker);
  check();
  chrome.tabs.create({ url: url });
});

function updateIcon(connected) {
  var image = 'not_connected.png'
    , title = 'You are not connected to the tor network';

  if(connected) {
    image = 'connected.png';
    title = 'You are connected to the tor network';
  }

  chrome.browserAction.setTitle({ title: title });
  chrome.browserAction.setIcon({ path: { 38: '/icons/' + image } });
}

function check() {
  var xhr = new XMLHttpRequest();
  var onStateChange = function() {
    var stat = 'not_connected';
    if(xhr.readyState === 4) {
      updateIcon(xhr.responseText.indexOf('Sorry') === -1);
    }
    checker = setTimeout(check, 50000);
  };

  xhr.onreadystatechange = onStateChange;
  xhr.open("GET", url);
  xhr.send();
}

check();
