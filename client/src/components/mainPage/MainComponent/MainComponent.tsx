import React from 'react';
import "./MainComponent.scss";
import FeedBlock from "../FeedBlock/FeedBlock";
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