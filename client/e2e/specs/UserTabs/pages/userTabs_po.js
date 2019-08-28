class userPage {

    get userProfileTab () {return $('//a[contains(@class, "user-tab") and contains(., "Profile")]')};
    get userPostsTab () {return $('//a[contains(@class, "user-tab") and contains(., "Posts")]')};
    get userReviewsTab () {return $('//a[contains(@class, "user-tab") and contains(., "Reviews")]')};
    get userEventsTab () {return $('//a[contains(@class, "user-tab") and contains(., "Events")]')};
    get userSurveysTab () {return $('//a[contains(@class, "user-tab") and contains(., "Surveys")]')};
    get userTopsTab () {return $('//a[contains(@class, "user-tab") and contains(., "Tops")]')};
    get userListsTab () {return $('//a[contains(@class, "user-tab") and contains(., "Lists")]')};
    get userWatchedTab () {return $('//a[contains(@class, "user-tab") and contains(., "Watched")]')};
    
};

module.exports = userPage;

