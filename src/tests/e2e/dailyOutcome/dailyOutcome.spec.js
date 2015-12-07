var CreateOutcomePage = require('../common/createOutcome.po.js');
var OverviewPage = require('../overview/overview.po.js');
var Login = require('../login/login.po.js');
var Common = require('../common/common.js');

describe('Daily Outcome Page', function () {

    var createOutcomePage = new CreateOutcomePage();
    var overviewPage = new OverviewPage();
    var login = new Login();
    var common = new Common();

    beforeAll(function () {
        common.clearDB();
        browser.driver.manage().deleteAllCookies();

        common.goHome();
        login.setLoginUserName('bjaanes');
        login.setPassword('1234');
        login.loginButton.click();
        browser.waitForAngular();
    });

    beforeEach(function () {
        common.goHome();
    });

    it('should have no related outcomes before any related outcomes exist', function () {
        common.dailyOutcomeMenuButton.click();

        expect(createOutcomePage.relatedEntries.count()).toBe(0);
    });

    it('should be able to create a new daily outcome', function () {
        common.dailyOutcomeMenuButton.click();

        var outcome1 = 'Outcome number 1';
        var outcome2 = 'Outcome number 2';
        var outcome3 = 'Outcome number 3';

        createOutcomePage.outcome1InputField.sendKeys(outcome1);
        createOutcomePage.outcome2InputField.sendKeys(outcome2);
        createOutcomePage.outcome3InputField.sendKeys(outcome3);

        createOutcomePage.saveButton.click();

        common.overviewMenuButton.click();

        expect(overviewPage.currentOutcomes.count()).toBe(1);
        expect(overviewPage.titleFromCurrentOutcome(0).getText()).toBe('Daily Outcome');
        expect(overviewPage.firstStoryFromCurrentOutcome(0).getText()).toBe(outcome1);
        expect(overviewPage.secondStoryFromCurrentOutcome(0).getText()).toBe(outcome2);
        expect(overviewPage.thirdStoryFromCurrentOutcome(0).getText()).toBe(outcome3);
    });

    it('should show related outcomes', function () {
        common.mondayVisionMenuButton.click();
        createOutcomePage.outcome1InputField.sendKeys('Related Outcome number 1');
        createOutcomePage.outcome2InputField.sendKeys('Related Outcome number 2');
        createOutcomePage.outcome3InputField.sendKeys('Related Outcome number 3');
        createOutcomePage.saveButton.click();
        common.overviewMenuButton.click();

        common.dailyOutcomeMenuButton.click();
        expect(createOutcomePage.relatedEntries.count()).toBe(1);
    });

});