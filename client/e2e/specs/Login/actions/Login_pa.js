const LoginPage = require('../page/Login_po');
const page = new LoginPage();

class LoginActions {

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

    clickLoginButton() {
        page.loginButton.waitForDisplayed(2000);
        page.loginButton.click();
        page.loginButton.waitForDisplayed(2000, true);
    }
}

module.exports = LoginActions;
