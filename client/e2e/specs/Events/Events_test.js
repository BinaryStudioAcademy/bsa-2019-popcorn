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
        wait.forElementsLoaded(credentials.eventItemsPath);
    });
    
    afterEach(() => {
        browser.reloadSession();
    });


    it('should create event with valid credentials', () => {
        let title = faker.random.words();
        pageActions.clickCreateEventButton();
        pageActions.enterTitle(title);
        pageActions.uploadImage(credentials.image);
        pageActions.enterDetails(faker.lorem.paragraph());
        pageActions.enterTimeStart(credentials.dateStart);
        pageActions.enterTimeEnd(credentials.dateEnd);
        pageActions.enterLocation(faker.address.country());
        pageActions.clickSaveButton();
        wait.forNewElementLoaded(credentials.eventItemsPath, '+');
        validate.elementIsInList(title);
    });

    it('should delete event', () => {
        eventQty = pageActions.countEventItems();
        pageActions.clickDeleteEventButton();
        wait.forNewElementLoaded(credentials.eventItemsPath, '-');
        validate.elementsQuantityChanged(eventQty, pageObjects.eventItems, '-')
    });
}); 
