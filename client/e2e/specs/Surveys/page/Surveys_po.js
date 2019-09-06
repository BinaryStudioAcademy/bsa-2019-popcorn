class SurveyPage {

    get surveyItems () {return $$(`div.survey-list-item`)};
    get createSurveyButton () {return $('//div[contains(@class, "create-item-button") and contains(., "Create survey")]')};
    get titleInput () {return $('textarea.survey-title')};
    get descriptionInput () {return $('textarea.survey-description')};
    get imageInput () {return $('input.upload-image')};
    get addQuestionButton () {return $('button.add-question-bttn')};
    get questionInput () {return $('textarea.question-title')};
    get optionInput () {return $('textarea.option')};
    get saveButton () {return $('button.save-question-bttn')};
    get deleteSurveyButton () {return $('button.delete-bttn')};
    get confirmDeleteButton () {return $('button.delete')}


};

module.exports = SurveyPage;

