import React from "react";
import FeedItem from "../FeedItem/FeedItem";
import "./FeedList.scss"

const FeedList = ({posts}) => {
    return <div className={"feed-list"}>
        <div className={"feed-heading"}>News feed</div>
        {posts ?
            posts.map(elem =>
                <FeedItem feedItem={{
                    author: "Doug Walker",
                    postDate: "2 hours ago",
                    postImage: "https://ichef.bbci.co.uk/news/660/cpsprodpb/462C/production/_107846971_lion_king_disney.jpg",
                    authorImage: "https://pbs.twimg.com/profile_images/1088129693390385152/oYJSGsdq_400x400.jpg"
                }}/>)
            :
            <div>There is no post</div>}
    </div>
};

export default FeedList;