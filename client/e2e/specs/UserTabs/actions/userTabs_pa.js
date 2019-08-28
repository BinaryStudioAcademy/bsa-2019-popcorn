const userPage = require('../pages/userTabs_po');
const menu = new userPage();

class userPageActions {
    
    navigateToProfile() {
        menu.userProfileTab.waitForDisplayed(4000);
        menu.userProfileTab.click();
    }

    navigateToPosts() {
        menu.userPostsTab.waitForDisplayed(4000);
        menu.userPostsTab.click();
    }

    navigateToReviews() {
        menu.userReviewsTab.waitForDisplayed(4000);
        menu.userReviewsTab.click();
    }

    navigateToEvents() {
        menu.userEventsTab.waitForDisplayed(4000);
        menu.userEventsTab.click();
    }

    navigateToSurveys() {
        menu.userSurveysTab.waitForDisplayed(4000);
        menu.userSurveysTab.click();
    }

    navigateToTops() {
        menu.userTopsTab.waitForDisplayed(4000);
        menu.userTopsTab.click();
    }

    navigateToLists() {
        menu.userListsTab.waitForDisplayed(4000);
        menu.userListsTab.click();
    }

    navigateToWatched() {
        menu.userWatchedTab.waitForDisplayed(4000);
        menu.userWatchedTab.click();
    }

}

module.exports = userPageActions;
