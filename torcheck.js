var url = "https://check.torproject.org"
  , proxied = false;

// define settings for tor proxy
var proxy = {
  mode: 'fixed_servers',
  rules: { singleProxy: { scheme: 'socks5', host: '127.0.0.1', port: 9050 } }
};

// update the icon on network events
window.addEventListener('online', check);
window.addEventListener('offline', function() {
  updateIcon({ connected: false });
});

// listen for icon clicks
chrome.browserAction.onClicked.addListener(function(tab) {
  var config = proxied ? { mode: 'system' } : proxy;
  chrome.proxy.settings.set({ value: config, scope: 'regular' }, function() {
    proxied = !proxied; 
    updateIcon({ connected: proxied });
  });
});

function updateIcon(options) {
  var image = 'not_connected.png'
    , title = 'You are not connected to the tor network';

  proxied = !!options.connected;
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
  }
}

function check() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = onReadyStateChange;
  xhr.open("GET", url);
  xhr.send();
}

check();
