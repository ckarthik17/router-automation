const express = require('express');
const vpn = require('./vpn.js');
const path = require('path'); 

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/vpn', async (req, res) => {
    vpn.connectVPN();
    res.render('vpn');
});

app.get('/inet', async (req, res) => {
    vpn.connectDHCP();
    res.render('inet');
});

app.get('/hi', async(req, res) => {
    res.render('hello');
});

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

app.listen(3000, () => console.log('App listening on port 3000!'));
