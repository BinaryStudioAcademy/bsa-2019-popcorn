class LoginPage {

    get emailInput () {return $('input[name=email]')};
    get passwordInput () {return $('input[type=password]')};
    get loginButton () {return $('button[type=submit]')};

};

module.exports = LoginPage;

