class NewEventPage {

    get createEventButton () {return $('div.create-event-button')};
    get titleInput () {return $('//span[contains(., "Title")]/../input')};
    get imageInput () {return $('input.upload-image')};
    get detailsInput () {return $('//span[contains(., "Details")]/../textarea')};
    get timeStartInput () {return $$('div.react-datepicker__input-container input')[0]};
    get timeEndInput () {return $$('div.react-datepicker__input-container input')[1]};
    get locationInput () {return $('div.map input')};
    get locationOption () {return $('div.map li')};
    get saveButton () {return $('button.save-btn')};

};

module.exports = NewEventPage;

