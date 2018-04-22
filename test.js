let webdriver = require('selenium-webdriver');
driver = new webdriver.Builder().forBrowser('firefox')
            .build();

driver.get('https://www.google.com');
 
driver.getTitle().then(function (title) {
    console.log("Title is: " + title);
});
 
driver.quit();