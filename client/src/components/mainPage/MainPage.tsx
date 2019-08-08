import React from 'react';
import "./MainPage.scss";
import FeedBlock from "./FeedBlock/FeedBlock";
//mock

const MainPage = (props: object) => {
    return (
        <div>
            <div>stories</div>
            <FeedBlock />
        </div>
    );
}

export default MainPage;