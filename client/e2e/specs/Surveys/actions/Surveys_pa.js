const SurveyPage = require('../page/Surveys_po');
const page = new SurveyPage();
const path = require('path');

class SurveyActions {

    clickCreateSurveyButton() {
        page.createSurveyButton.waitForDisplayed(2000);
        page.createSurveyButton.click();
        page.createSurveyButton.waitForDisplayed(2000, true);
    }
    
    enterTitle(value) {
        page.titleInput.waitForDisplayed(2000);
        page.titleInput.clearValue();
        page.titleInput.setValue(value);
    }

    enterDescription(value) {
        page.descriptionInput.waitForDisplayed(2000);
        page.descriptionInput.clearValue();
        page.descriptionInput.setValue(value);
    }

    uploadImage(imagePath) {
        page.imageInput.waitForExist(5000);
        page.imageInput.setValue(path.resolve(imagePath));
        page.imageInput.waitForEnabled(5000)
    }

    clickAddQuestionButton() {
        page.addQuestionButton.scrollIntoView({block: "center"});
        page.addQuestionButton.click();
    }

    enterQuestionTitle(value) {
        page.questionInput.waitForDisplayed(2000);
        page.questionInput.clearValue();
        page.questionInput.setValue(value);
    }

    enterOption(value) {
        page.optionInput.waitForDisplayed(2000);
        page.optionInput.clearValue();
        page.optionInput.setValue(value);
    }

    clickSaveButton() {
        page.saveButton.scrollIntoView({block: "center"});
        page.saveButton.click();
        page.saveButton.waitForDisplayed(2000, true);
    }

    clickDeleteSurveyButton() {
        page.deleteSurveyButton.waitForDisplayed(2000, false, "There is no elements to delete");
        page.deleteSurveyButton.click();
    }

    clickConfirmDeleteButton() {
        page.confirmDeleteButton.waitForDisplayed(2000, false, "There is no elements to delete");
        page.confirmDeleteButton.click();
        page.confirmDeleteButton.waitForDisplayed(2000, true)
    }
}

module.exports = SurveyActions;
