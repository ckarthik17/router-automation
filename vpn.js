var webdriver = require('selenium-webdriver');
var by = webdriver.By;
var until = webdriver.until;
const publicIp = require('public-ip');
const iplocate = require("node-iplocate");

let WAIT_MLS = 10000;
let PWD = '';
let PPTP = 'pptp'
let DHCP = 'dynamic'

const chromeCapabilities = webdriver.Capabilities.chrome();
// chromeCapabilities.set('chromeOptions', {args: ['--headless']});

function setupInet(inetType) {
    driver = new webdriver.Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();

    driver.manage().window().maximize();                        
    driver.get('http://192.168.0.1/bsc_wan.php');
    
    pwdField = driver.findElement(by.id('loginpwd'));
    pwdField.sendKeys(PWD);
    
    loginBtn = driver.findElement(by.id('noGAC'));
    loginBtn.click();
    
    modeId = by.id('wan_ip_mode');
    
    driver.wait(until.elementLocated(modeId), WAIT_MLS).then(function(modeElement) {
        console.log('Login successful');
        driver.wait(until.elementIsVisible(modeElement), WAIT_MLS).then(function() {
            modeElement.sendKeys(inetType);
    
            topSave = driver.findElement(by.id('topsave'));
            topSave.click();
            console.log('Saving');

            menuId = by.id('menu');
            driver.wait(until.elementLocated(menuId), WAIT_MLS).then(function(menuEl) {
                console.log('Loading completed');
                driver.wait(until.elementIsVisible(menuEl), WAIT_MLS).then(function() {                
                    driver.get('http://192.168.0.1/status.php');
    
                    statusText = driver.findElement(by.id('st_networkstatus'));
                    console.log('Waiting for connection');
                    driver.wait(until.elementTextIs(statusText, 'Connected'), WAIT_MLS * 2).then(function() {
                        console.log('Mode : `' + inetType + '` Connected');                    
                        driver.quit();                    
                        ipLocation();
                    });
                });
            });
        });
    });    
}

function ipLocation() {
    publicIp.v4().then(myIp => {
        console.log("My IP address : " + myIp);
        iplocate(myIp)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err)
            });            
    });
}

setupInet(DHCP);