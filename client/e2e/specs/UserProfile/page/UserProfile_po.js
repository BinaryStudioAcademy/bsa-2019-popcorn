class UserProfilePage {

    get editUserProfileButton () {return $('svg.edit-icon')};
    get nameInput () {return $('//p[contains(., "Name:")]/../input')};
    get genderRadio () {return $('input[type=radio]:not([checked])')};
    get locationInput () {return $('//p[contains(., "Location:")]/../input')};
    get aboutInput () {return $('//p[contains(., "About:")]/../input')};
    get saveButton () {return $('button.save-btn')};
};

module.exports = UserProfilePage;

