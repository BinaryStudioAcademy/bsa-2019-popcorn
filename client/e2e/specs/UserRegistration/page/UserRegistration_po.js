class UserRegistrationPage {

    get nameInput () {return $('input[name=name]')};
    get emailInput () {return $('input[name=email]')};
    get passwordInput () {return $('input[type=password]')};
    get signUpButton () {return $('button[type=submit]')};   

};

module.exports = UserRegistrationPage;

