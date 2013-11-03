var url = "https://check.torproject.org"
  , proxied = false;

/**
 * Define network settings
 */
var system_network = { mode: 'system' };
var tor_network = {
  mode: 'fixed_servers',
  rules: { singleProxy: { scheme: 'socks5', host: '127.0.0.1', port: 9050 } }
};

/**
 * Check tor connection status when coming online
 */
window.addEventListener('online', function() {
  checkProxy(onProxyCheck);
});

/**
 * Update browser action icon when going offline
 */
window.addEventListener('offline', function() {
  onConnectionChange(false);
});

// watch for proxy errors
/**
 * Update browser action icon and proxy settings on proxy error
 */
chrome.proxy.onProxyError.addListener(function(details) {
  console.error('Proxy Error: ' + details.error);
  console.info('Make sure tor is running at localhost:9050');

  // disable proxy
  toggleTorProxy(onConnectionChange);
});

/**
 * Toggle tor proxy settings on browser action icon click
 */
chrome.browserAction.onClicked.addListener(function(tab) {
  toggleTorProxy(onConnectionChange);
});

/**
 * Toggle chrome proxy settings between system and tor
 */
function toggleTorProxy(cb) {
  var config = proxied ? system_network : tor_network;
  chrome.proxy.settings.set({ value: config, scope: 'regular' }, function() {
    cb(proxied = !proxied);
  });
}

/**
 * Update the browser action icon
 */
function onConnectionChange(connected) {
  var stat  = connected ? "are" : "aren't"
    , image = connected ? 'connected.png' : 'not_connected.png'
    , title = "You "+ stat +" connected to the tor network";

  chrome.browserAction.setTitle({ title: title });
  chrome.browserAction.setIcon({ path: { 38: '/icons/' + image } });
}

/**
 * Check for a current tor connection using check.torproject.org
 */
function checkProxy(cb) {
  var xhr = new XMLHttpRequest();
  // don't wait too long
  xhr.timeout = 5000;
  xhr.onerror = cb;
  xhr.ontimeout = cb;
  xhr.onload = function(e) {
    var resp = e.target.responseText;
    cb(null, (resp && resp.indexOf('Sorry') === -1));
  };
  xhr.open("GET", url);
  xhr.send();
}

/**
 * Handle proxy connection status check
 */
function onProxyCheck(err, isTor) {
  if(err) {
    console.warn('Failed to check tor status at ' + url);
    return chrome.browserAction.setTitle({
      title: 'Unable to check tor status'
    });
  }
  onConnectionChange(isTor);
}

// check proxy status on boot
checkProxy(onProxyCheck);
