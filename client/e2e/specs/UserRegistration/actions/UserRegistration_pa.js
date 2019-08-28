const UserRegistrationPage = require('../page/UserRegistration_po');
const page = new UserRegistrationPage();

class UserRegistrationActions {

    enterName(value) {
        page.nameInput.waitForDisplayed(2000);
        page.nameInput.clearValue();
        page.nameInput.setValue(value);
    }

    enterEmail(value) {
        page.emailInput.waitForDisplayed(2000);
        page.emailInput.clearValue();
        page.emailInput.setValue(value);
    }

    enterPassword(value) {
        page.passwordInput.waitForDisplayed(2000);
        page.passwordInput.clearValue();
        page.passwordInput.setValue(value);
    }

    clickSignUpButton() {
        page.signUpButton.waitForDisplayed(2000);
        page.signUpButton.click();
    }

}

module.exports = UserRegistrationActions;
