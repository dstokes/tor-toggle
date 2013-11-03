tor-toggle
===========

A simple chrome extension for toggling tor proxy settings

![tor-toggle](docs/toggle.gif)

usage
=====

Click to active tor proxy settings in chrome, click again to deactivate. 
It's that simple..

install
=======

1. `git clone git@github.com:dstokes/tor-toggle.git`
2. Navigate to `chrome://extensions`
3. Toggle into "Developer Mode"
4. Click on "Load Unpacked Extension..."
5. Select the tor-toggle directory

requirements
============

For this extension to work, you need to have tor running on port 5090 of your
local machine.

1. Install tor (https://www.torproject.org/docs/tor-doc-osx.html.en)
2. Run it in a background process `tor &> ~/tor.log &`

disclaimer
==========

This extension doesn't protect you from things like flash accessing your
actual ip address. If complete annonymity is what you seek, try configuring
a new "Location" in your Network Settings (OSX) and switching to it when
wanting to browse under tor. The extension recognizes network changes and
will accurately report your tor connection status.
