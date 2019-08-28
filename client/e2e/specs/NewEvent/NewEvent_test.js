const faker = require('faker');
const credentials = require('./../../credentials.json');
const help = require('../../helpers/helpers');
const validate = require('../../helpers/validators');
const wait = require('../../helpers/waiters');
const menuActions = require('../Menu/actions/menu_pa');
const userTabsActions = require('../UserTabs/actions/userTabs_pa');
const newEventActions = require('./actions/NewEvent_pa');

const menu = new menuActions();
const userTabs = new userTabsActions();
const pageSteps = new newEventActions();

describe('Events on the Popcorn site', () => {

    beforeEach(() => {
        help.loginWithDefaultUser();
        wait.forSpinner();
    });
    
    afterEach(() => {
        browser.reloadSession();
    });


    it('should create event with valid credentials', () => {
        menu.navigateToUserPage();
        userTabs.navigateToEvents();
        
        let title = faker.random.words();
        pageSteps.clickCreateEventButton();
        pageSteps.enterTitle(title);
        pageSteps.uploadImage(credentials.image);
        pageSteps.enterDetails(faker.lorem.paragraph());
        pageSteps.enterTimeStart(credentials.dateStart);
        pageSteps.enterTimeEnd(credentials.dateEnd);
        pageSteps.enterLocation(faker.address.country());
        pageSteps.clickSaveButton();
        wait.forElementLoaded(credentials.eventItemsPath);
        validate.elementIsInList(title);
    });
}); 
