require('colors');

var wd = require('wd');
var browser = wd.promiseChainRemote();

// optional extra logging
browser.on('status', function(info) {
  console.log(info.cyan);
});
browser.on('command', function(eventType, command, response) {
  console.log(' > ' + eventType.cyan, command, (response || '').grey);
});
browser.on('http', function(meth, path, data) {
  console.log(' > ' + meth.magenta, path, (data || '').grey);
});

let WAIT_MLS = 10000;
let PWD = '';
let PPTP = 'pptp'
let DHCP = 'dynamic'

function setupInet(inetType) {
    browser.init({browserName:'firefox'}).get("http://192.168.0.1/bsc_wan.php");
    
    browser.get("http://google.com");
    console.log("Title is " + browser.title() + ", param : " + inetType);
}

var vpn = {};

vpn.connectVPN = function() {
    setupInet(PPTP);
}

vpn.connectDHCP = function() {
    setupInet(DHCP);
}

module.exports = vpn;