tor-checker
===========

A simple chrome extension for reporting your current tor connection status.

![tor-checker](docs/screenshot.png)

installing
==========

1. `git clone git@github.com:dstokes/chrome-tor-checker.git`
2. Navigate to `chrome://extensions`
3. Toggle into "Developer Mode"
4. Click on "Load Unpacked Extension..."
5. Select the tor-checker directory

running chrome on tor in OSX
============================

To get your system to use the tor network for requests:

1. Install and run tor (https://www.torproject.org/docs/tor-doc-osx.html.en)
2. Open System Preferences > Network
3. Select "Edit Location" from the locations dropdown
4. Add a new location (i.e. "tor")
5. Open Advanced > Proxies in the new location window
6. Check "SOCKS Proxy" with `localhost` and port `9050`

Tor can now be toggled by selecting the new location from the
System Menu "Locations" option.
