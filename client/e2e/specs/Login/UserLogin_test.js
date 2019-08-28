const credentials = require('./../../credentials.json');
const help = require('../../helpers/helpers');
const validate = require('../../helpers/validators');
const wait = require('../../helpers/waiters');



describe('Login on the Popcorn site', () => {

    afterEach(() => {
        browser.reloadSession();
    });


    it('should login with valid credentials', () => {
        help.loginWithDefaultUser();
        wait.forSpinner();
        validate.pageTransition('');
    });
}); 
