import React from "react";
import PostList from "../PostList/PostList"
import RecommendList from "../RecommendList/RecommendList"
import "./FeedBlock.scss"
import TopList from "../TopList/TopList";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';

const FeedBlock =()=>{
        return <div className="feed-block">
            <PostList />
            <RecommendList />
            <TopList/>
        </div>
    
}



const mapStateToProps = (rootState, props) => ({
    ...props,
});

const actions = {
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedBlock);