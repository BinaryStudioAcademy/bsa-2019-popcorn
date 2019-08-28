const NewEventPage = require('../page/NewEvent_po');
const page = new NewEventPage();
const path = require('path');

class NewEventActions {

    clickCreateEventButton() {
        page.createEventButton.waitForDisplayed(2000);
        page.createEventButton.click();
        //page.createEventButton.waitForDisplayed(2000, true);
    }
    
    enterTitle(value) {
        page.titleInput.waitForDisplayed(2000);
        page.titleInput.clearValue();
        page.titleInput.setValue(value);
    }

    uploadImage(imagePath) {
        page.imageInput.waitForExist(5000);
        page.imageInput.setValue(path.resolve(imagePath));
    }

    enterDetails(value) {
        page.detailsInput.waitForDisplayed(2000);
        page.detailsInput.clearValue();
        page.detailsInput.setValue(value);
    }

    enterTimeStart(value) {
        page.timeStartInput.waitForDisplayed(2000);
        page.timeStartInput.clearValue();
        page.timeStartInput.setValue(value);
        browser.keys("\uE007"); 
    }

    enterTimeEnd(value) {
        page.timeEndInput.waitForDisplayed(2000);
        page.timeEndInput.clearValue();
        page.timeEndInput.setValue(value);
        browser.keys("\uE007"); 
    }

    enterLocation(value) {
        page.locationInput.waitForDisplayed(2000);
        page.locationInput.clearValue();
        page.locationInput.setValue(value);
        page.locationOption.waitForDisplayed(4000);
        page.locationOption.click();
    }

    clickSaveButton() {
        page.saveButton.scrollIntoView({block: "center"});
        page.saveButton.click();
        //page.saveButton.waitForDisplayed(2000, true);
    }
}

module.exports = NewEventActions;
