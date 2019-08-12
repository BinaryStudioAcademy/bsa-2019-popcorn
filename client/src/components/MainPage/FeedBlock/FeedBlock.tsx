import React from "react";
import PostList from "../PostList/PostList"
import RecommendList from "../RecommendList/RecommendList"
import "./FeedBlock.scss"
import TopList from "../TopList/TopList";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import Spinner from "../../shared/Spinner";
import {fetchPosts} from "./FeedBlock.redux/actions";

interface IProps {
    posts: any,
    fetchPosts: () => any
}

const FeedBlock =(props: IProps)=>{
        if(!props.posts){
            props.fetchPosts()
        }

        return <div className={"feed-block"}>
            {props.posts ? <PostList posts={props.posts}/> : <Spinner/>}
            <RecommendList />
            <TopList/>
        </div>
    
}



const mapStateToProps = (rootState, props) => ({
    ...props,
    posts: rootState.feed.posts
});

const actions = {
    fetchPosts
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedBlock);