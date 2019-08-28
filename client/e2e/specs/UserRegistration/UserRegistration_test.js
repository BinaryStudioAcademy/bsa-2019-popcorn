const UserRegistrationActions = require('./actions/UserRegistration_pa')
const MenuActions = require('../Menu/actions/menu_pa');
const credentials = require('./../../credentials.json');
const wait = require('../../helpers/waiters');
const validate = require('../../helpers/validators');
const faker = require('faker');


const menuSteps = new MenuActions();
const pageSteps = new UserRegistrationActions();


describe('User registration on the Popcorn site', () => {
    
    beforeEach(() => {
        browser.url(credentials.appUrl);
    });

    afterEach(() => {
        browser.reloadSession();
    });

    it('should register with valid data', () => {
        menuSteps.navigateToSignUp();

        let email = faker.internet.email();
        let password = faker.internet.password();
        console.log(email + "\n" + password)
        pageSteps.enterName(faker.name.findName());
        pageSteps.enterEmail(email);
        pageSteps.enterPassword(password);
        pageSteps.clickSignUpButton();
        
        wait.forSpinner();
        validate.pageTransition('');
    });

}); 
