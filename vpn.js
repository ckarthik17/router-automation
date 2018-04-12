var webdriver = require('selenium-webdriver');
var by = webdriver.By;
var until = webdriver.until;
let WAIT_MLS = 5000;

const chromeCapabilities = webdriver.Capabilities.chrome();
chromeCapabilities.set('chromeOptions', {args: ['--headless']});

driver = new webdriver.Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();

driver.manage().window().maximize();                        
driver.get('http://192.168.0.1/bsc_wan.php');

pwdField = driver.findElement(by.id('loginpwd'));
pwdField.sendKeys('');

loginBtn = driver.findElement(by.id('noGAC'));
loginBtn.click();

modeId = by.id('wan_ip_mode');

driver.wait(until.elementLocated(modeId), WAIT_MLS).then(function(el) {
    modeElement = el;
    driver.wait(until.elementIsVisible(modeElement), WAIT_MLS).then(function() {
        modeElement.sendKeys('dynamic');

        topSave = driver.findElement(by.id('topsave'));
        topSave.click();

        menuId = by.id('menu');
        driver.wait(until.elementLocated(menuId), WAIT_MLS).then(function(menuEl) {
            console.log('Menu found');
            driver.wait(until.elementIsVisible(menuEl), WAIT_MLS).then(function() {
                console.log('Saved successfully');
                driver.get('http://192.168.0.1/status.php');

                statusText = driver.findElement(by.id('st_networkstatus'));
                driver.wait(until.elementTextIs(statusText, 'Connected'), WAIT_MLS).then(function() {
                    console.log('Connected');
                    driver.quit();
                });
            });
        });
    });
});
