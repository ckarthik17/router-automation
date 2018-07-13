const express = require('express');
const vpn = require('./vpn.js');
const app = express();

app.get('/vpn', async (req, res) => {
    vpn.connectVPN();
    await sleep(15000);
    res.send('<h2>VPN setting updated</h2> </br> Visit to check status : <a href="https://www.whatismybrowser.com/detect/ip-address-location">https://www.whatismybrowser.com/detect/ip-address-location</a>');
});

app.get('/inet', async (req, res) => {
    vpn.connectDHCP();
    await sleep(15000);
    res.send('<h2>Normal internet setting updated</h2> </br> Visit to check status : <a href="https://www.whatismybrowser.com/detect/ip-address-location">https://www.whatismybrowser.com/detect/ip-address-location</a>');
});

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

app.listen(3000, () => console.log('App listening on port 3000!'));
