const assert = require('chai').assert;
const credentials = require('./../credentials.json');

class AssertHelper {

    pageTransition(pathname) {
        const url = new URL(browser.getUrl());
        const actualUrl = url.protocol.toString() + '//' + url.hostname.toString() + url.pathname.toString();
        assert.equal(actualUrl, credentials.appUrl + pathname, `Expected ${actualUrl} to be equal to ${credentials.appUrl + pathname}`)
    }

    elementIsInList(name) {
        const element = $$(`//div[contains(., "${name}")]`);
        assert.isAtLeast(element.length, 1, `Target element is not found`);
    }

    elementsQuantityChanged(basicQty, items, sign) {
        const actualQty = items.length;
        assert.strictEqual(actualQty, basicQty + +(sign+1), `Quantity is not changed`)
    };
}

module.exports = new AssertHelper();