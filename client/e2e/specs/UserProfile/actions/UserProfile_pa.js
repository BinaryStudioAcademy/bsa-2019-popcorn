const UserProfilePage = require('../page/UserProfile_po');
const page = new UserProfilePage();
const path = require('path');

class UserProfileActions {

    clickEditUserProfileButton() {
        page.editUserProfileButton.waitForDisplayed(2000);
        page.editUserProfileButton.click();
        page.editUserProfileButton.waitForDisplayed(2000, true);
    }
    
    enterName(value) {
        page.nameInput.waitForDisplayed(2000);
        page.nameInput.clearValue();
        page.nameInput.setValue(value);
    }

    chooseGender(gender) {
        const genderRadio = $(`input[type=radio][value='${gender}']`);
        genderRadio.waitForDisplayed(2000);
        genderRadio.click();
    }

    enterLocation(value) {
        page.locationInput.waitForDisplayed(2000);
        page.locationInput.clearValue();
        page.locationInput.setValue(value);
    }

    enterAbout(value) {
        page.aboutInput.waitForDisplayed(2000);
        page.aboutInput.clearValue();
        page.aboutInput.setValue(value);
    }

    clickSaveButton() {
        page.saveButton.scrollIntoView({block: "center"});
        page.saveButton.click();
        page.saveButton.waitForDisplayed(2000, true);
    }
}

module.exports = UserProfileActions;
