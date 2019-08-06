import React from "react";
import FeedList from "../FeedList/FeedList"
import RecommendList from "../RecommendList/RecommendList"
import "./FeedBlock.scss"

const FeedBlock =()=>{
        return <div className="feed-block">
            <FeedList />
            <RecommendList />
        </div>
    
}

export default FeedBlock;