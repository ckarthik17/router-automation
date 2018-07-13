require('colors');
var wd = require('wd');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var asserters = wd.asserters;
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
    browser.init({browserName:'chrome'})
        .setWindowSize(1400, 1024)
        .get('http://192.168.0.1/bsc_wan.php')
        .title()
        .should.become('D-LINK SYSTEMS, INC. | WIRELESS ROUTER | HOME')
        .elementById('loginpwd')
        .type(PWD)
        .elementById('noGAC')
        .click()
        .waitForElementById('wan_ip_mode', asserters.isVisible)
        .type(inetType)
        .elementById('topsave')
        // .fin(function() { return browser.quit(); })
        .done();
}

var vpn = {};

vpn.connectVPN = function() {
    setupInet(PPTP);
}

vpn.connectDHCP = function() {
    setupInet(DHCP);
}

setupInet(DHCP);

module.exports = vpn;
