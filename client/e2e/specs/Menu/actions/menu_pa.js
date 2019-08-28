const MenuPage = require('../pages/menu_po');
const menu = new MenuPage();

class MenuActions {

    navigateToSignUp() {
        menu.signUp.waitForDisplayed(4000);
        menu.signUp.click();
    }

    _moveToUserMenu() {
        menu.userMenu.waitForDisplayed(10000);
        menu.userMenu.moveTo();
        browser.pause(500);
    }

    navigateToUserPage() {
        this._moveToUserMenu();
        menu.userPage.waitForDisplayed(4000);
        menu.userPage.click();
    }

    navigateToSettings() {
        this._moveToUserMenu();
        menu.settings.waitForDisplayed(4000);
        menu.settings.click();
    }

    logOut() {
        this._moveToUserMenu();
        menu.logOut.waitForDisplayed(4000);
        menu.logOut.click();
    }
}

module.exports = MenuActions;
