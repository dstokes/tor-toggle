var url = "https://check.torproject.org"
  , checker = null;

// update the icon on network events
window.addEventListener('online', check);
window.addEventListener('offline', function() {
  updateIcon({ connected: false });
});

// listen for icon clicks
chrome.browserAction.onClicked.addListener(function(tab) {
  check();
  chrome.tabs.create({ url: url });
});

function updateIcon(options) {
  var image = 'not_connected.png'
    , title = 'You are not connected to the tor network';

  if(options.connected) {
    image = 'connected.png';
    title = 'You are connected to the tor network';
  }

  chrome.browserAction.setTitle({ title: title });
  chrome.browserAction.setIcon({ path: { 38: '/icons/' + image } });
}

function onReadyStateChange() {
  if(this.readyState === 4) {
    var resp = this.responseText;
    updateIcon({ connected: resp && resp.indexOf('Sorry') === -1 });
    checker = setTimeout(check, 100000);
  }
}

function check() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = onReadyStateChange;
  xhr.open("GET", url);
  xhr.send();
}

check();
