const faker = require('faker');
const credentials = require('./../../credentials.json');
const help = require('../../helpers/helpers');
const validate = require('../../helpers/validators');
const wait = require('../../helpers/waiters');
const menuActions = require('../Menu/actions/menu_pa');
const userProfileActions = require('./actions/UserProfile_pa');

const menu = new menuActions();
const pageActions = new userProfileActions();

describe('UserProfiles on the Popcorn site', () => {

    beforeEach(() => {
        help.loginWithDefaultUser();
        wait.forSpinner();
        menu.navigateToUserPage();
    });
    
    afterEach(() => {
        browser.reloadSession();
    });


    it('should edit user info with valid credentials', () => {
        let name = faker.name.findName();
        let location = faker.address.city();
        let about = faker.random.words();
        pageActions.clickEditUserProfileButton();
        pageActions.enterName(name);
        pageActions.chooseGender('male');
        pageActions.enterLocation(location);
        pageActions.enterAbout(about);
        pageActions.clickSaveButton();
        browser.refresh();
        wait.forSpinner();

        validate.elementIsInList(name);
        validate.elementIsInList('Male');
        validate.elementIsInList(location);
        validate.elementIsInList(about);
        
        pageActions.clickEditUserProfileButton();
        pageActions.enterName(credentials.name);
        pageActions.chooseGender('female');
        pageActions.enterLocation(credentials.location);
        pageActions.enterAbout(credentials.about);
        pageActions.clickSaveButton();
    });
}); 
