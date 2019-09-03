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

    forElementsLoaded(itemsPath) {
        try {
            browser.waitUntil(() => {
                return $$(`${itemsPath}`).length > 0
            }, 5000, `There is no elements loaded ${$$(`${itemsPath}`).length}`)
        }
        catch(err) {
            return true;
        }
    }
}

module.exports = new CustomWaits();