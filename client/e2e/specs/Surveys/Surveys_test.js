const faker = require('faker');
const credentials = require('./../../credentials.json');
const help = require('../../helpers/helpers');
const validate = require('../../helpers/validators');
const wait = require('../../helpers/waiters');
const menuActions = require('../Menu/actions/menu_pa');
const userTabsActions = require('../UserTabs/actions/userTabs_pa');
const surveyActions = require('./actions/Surveys_pa');
const surveyObjects = require('./page/Surveys_po');

const menu = new menuActions();
const userTabs = new userTabsActions();
const pageActions = new surveyActions();
const pageObjects = new surveyObjects();

describe('Surveys on the Popcorn site', () => {

    beforeEach(() => {
        help.loginWithDefaultUser();
        wait.forSpinner();
        menu.navigateToUserPage();
        userTabs.navigateToSurveys();
        wait.forSpinner();
    });
    
    afterEach(() => {
        browser.reloadSession();
    });


    it('should create survey with valid credentials', () => {
        surveyQty = help.countItems(pageObjects.surveyItems);
        pageActions.clickCreateSurveyButton();
        pageActions.enterTitle(faker.random.words());
        pageActions.enterDescription(faker.lorem.paragraph());
        pageActions.uploadImage(credentials.image);
        pageActions.clickAddQuestionButton();
        pageActions.enterQuestionTitle(faker.random.words());
        pageActions.enterOption(faker.random.words());
        pageActions.clickSaveButton();
        wait.forSpinner();
        validate.elementsQuantityChanged(surveyQty, pageObjects.surveyItems, '+')
    });

    it('should delete survey', () => {
        surveyQty = help.countItems(pageObjects.surveyItems);
        pageActions.clickDeleteSurveyButton();
        pageActions.clickConfirmDeleteButton();
        wait.forSpinner();
        validate.elementsQuantityChanged(surveyQty, pageObjects.surveyItems, '-')
    });
}); 
