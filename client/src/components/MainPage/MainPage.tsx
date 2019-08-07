import React from 'react';
import MainPageSidebar from '../MainPageSidebar/MainPageSidebar';
import "./MainPage.scss";

//mock
const { userInfo, notifications } = {
    userInfo: {
        name: "Sofi Dub",
        image: "https://s3-alpha-sig.figma.com/img/919e/1a5a/da4f250d469108191ad9d4af68b2a639?Expires=1566172800&Signature=Kou41Z8bd8ig~9nLibgCH5gfaOc0K~9Io82-umabjJnomveXbPcqMWfD911bHy6h77reHT6ecNYFHCzmXkQNy3vEF-OzgJYgV875TI2rX~cPt1FaSJC5wCeybEfTrlBlCcdzSFn8iVcP~C8GTx-l6CIjyugGAhvr7xJ-hfAdlf~5Mll0Sy92dSKn8q7OkJdfsMvEEFVQ3rGHn8GGQZg1a60gif0VaQhuVX1gcRgwrsak~cerS1bnDvo93B1lFOIk85wlhY2hPwQrmCtI9A-qaAtbIxmzmxkRpuVUpDrX6Jd4hXpksbd7urSJ91Dg7tv9WzRZvIkLnPXflCfmPw~slw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
    },
    notifications: {
        newFriends: 12,
        newMessages: 0,
        newEvents: 2
    }
}

const MainPage = (props: object) => {
    return (
        <div className="main-page">
            <MainPageSidebar userInfo={userInfo} notifications={notifications} />
            <div>
                <div>stories</div>
                <div>feed</div>
            </div>
        </div>
    );
}

export default MainPage;