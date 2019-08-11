import React from "react";
import FeedItem from "../FeedItem/FeedItem";
import "./FeedList.scss"

interface IPosts {
    posts : null | Array<{id: string
    user:{
        name : string,
        avatar: string
    },
    //created_At,
    imageUrl: string}>
}
const FeedList = ({posts} : IPosts) => {
    return <div className={"feed-list"}>
        <div className={"feed-heading"}>News feed</div>
        {posts ?
            posts.map(post =>
                <FeedItem key={post.id} feedItem={{
                    author: post.user.name,
                    postDate: "2 hours ago", //post.created_At
                    postImage: post.imageUrl,
                    authorImage: post.user.avatar
                }}/>)
            :
            <div>There is no post</div>}
    </div>
};

export default FeedList;