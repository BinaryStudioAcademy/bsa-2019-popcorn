import React from "react";
import PostList from "../PostList/PostList"
import RecommendList from "../RecommendList/RecommendList"
import "./FeedBlock.scss"
import TopList from "../TopList/TopList";

const FeedBlock =()=>{
        return <div className="feed-block">
            <PostList />
            <RecommendList />
            <TopList/>
        </div>
    
}

export default FeedBlock;