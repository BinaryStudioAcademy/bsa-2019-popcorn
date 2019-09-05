const faker = require('faker');
const credentials = require('./../../credentials.json');
const help = require('../../helpers/helpers');
const validate = require('../../helpers/validators');
const wait = require('../../helpers/waiters');
const menuActions = require('../Menu/actions/menu_pa');
const userTabsActions = require('../UserTabs/actions/userTabs_pa');
const eventActions = require('./actions/Events_pa');
const eventObjects = require('./page/Events_po');

const menu = new menuActions();
const userTabs = new userTabsActions();
const pageActions = new eventActions();
const pageObjects = new eventObjects();

describe('Events on the Popcorn site', () => {

    beforeEach(() => {
        help.loginWithDefaultUser();
        wait.forSpinner();
        menu.navigateToUserPage();
        userTabs.navigateToEvents();
        wait.forSpinner();
    });
    
    afterEach(() => {
        browser.reloadSession();
    });


    it('should create event with valid credentials', () => {
        let eventQty = help.countItems(pageObjects.eventItems);
        pageActions.clickCreateEventButton();
        pageActions.enterTitle(faker.random.words());
        pageActions.uploadImage(credentials.image);
        pageActions.enterDetails(faker.lorem.paragraph());
        pageActions.enterTimeStart(credentials.dateStart);
        pageActions.enterTimeEnd(credentials.dateEnd);
        pageActions.enterLocation(faker.address.country());
        pageActions.clickSaveButton();
        wait.forSpinner();
        validate.elementsQuantityChanged(eventQty, pageObjects.eventItems, '+');
    });

    it('should delete event', () => {
        let eventQty = help.countItems(pageObjects.eventItems);
        pageActions.clickDeleteEventButton();
        wait.forSpinner();
        validate.elementsQuantityChanged(eventQty, pageObjects.eventItems, '-')
    });
}); 
