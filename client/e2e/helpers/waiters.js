class CustomWaits {
    forSpinner() {
        const spinner = $('div.spinner-wrp'); 
        spinner.waitForDisplayed(3000);
        spinner.waitForDisplayed(10000, true);
    }

    forElementLoaded(itemsPath) {
        const numberOfElements = $$(`${itemsPath}`).length;
        browser.waitUntil(() => {
            return $$(`${itemsPath}`).length === numberOfElements + 1;
        }, 5000, `Nothing is changed`)
    };

}

module.exports = new CustomWaits();