var webdriver = require('selenium-webdriver');
var by = webdriver.By;
var until = webdriver.until;

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
inetSetupId = by.id('inetsetup');

driver.wait(until.elementLocated(modeId), 10000).then(function(el) {
    modeElement = el;
    driver.wait(until.elementIsVisible(modeElement), 10000).then(function() {
        modeElement.sendKeys('pptp');

        topSave = driver.findElement(by.id('topsave'));
        topSave.click();

        driver.wait(until.elementLocated(inetSetupId), 10000).then(function(inetEl) {
            inetSetupEl = inetEl;
            driver.wait(until.elementIsVisible(inetSetupEl), 10000).then(function() {
                console.log('Saved successfully');
                driver.get('http://192.168.0.1/status.php');

                statusText = driver.findElement(by.id('st_networkstatus'));
                driver.wait(until.elementTextIs(statusText, 'Connected'), 10000).then(function() {
                    console.log('Connected');
                    driver.quit();
                });
            });
        });
    });
});
