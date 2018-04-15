const express = require('express');
const vpn = require('./vpn.js');
const app = express();

app.get('/vpn', (req, res) => {
    vpn.connectVPN();
    res.send('VPN connected!')
});

app.get('/inet', (req, res) => {
    vpn.connectDHCP();
    res.send('Internet connected!')
});

app.listen(3000, () => console.log('App listening on port 3000!'));
