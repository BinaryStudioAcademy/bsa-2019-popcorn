class MenuPage {
    get signUp () {return $('a[href="/registration"]')};
    get userMenu () {return $('div.user-info')};
    get userPage () {return $('div.user-info a[href*="/user-page"]')};
    get settings () {return $('div.user-info a[href*="/settings"]')};
    get logOut () {return $('//a[contains(., "Logout")]')};
};

module.exports = MenuPage;

