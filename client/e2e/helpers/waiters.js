class CustomWaits {
    forSpinner() {
        const spinner = $('div.spinner-wrp'); 
        spinner.waitForDisplayed(3000);
        spinner.waitForDisplayed(10000, true);
    }

    forNewElementLoaded(itemsPath, sign) {
        const numberOfElements = $$(`${itemsPath}`).length;
        browser.waitUntil(() => {
            return $$(`${itemsPath}`).length === numberOfElements + +(sign+1);
        }, 5000, `Nothing is changed`)
    };

    untilLoading() {
        const loadingElement = $('//span[contains(., "Loading...")]');
        loadingElement.waitForDisplayed(2000);
        loadingElement.waitForDisplayed(5000, true);
    }
}

module.exports = new CustomWaits();