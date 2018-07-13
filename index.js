const express = require('express');
const vpn = require('./vpn.js');
const app = express();

app.get('/vpn', async (req, res) => {
    vpn.connectVPN();
    await sleep(15000);
    res.send('VPN setting updated :: Visit to check status :: https://iplocation.com');
});

app.get('/inet', async (req, res) => {
    vpn.connectDHCP();
    await sleep(15000);
    res.send('Normal internet setting updated :: Visit to check status :: https://iplocation.com');
});

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

app.listen(3000, () => console.log('App listening on port 3000!'));
