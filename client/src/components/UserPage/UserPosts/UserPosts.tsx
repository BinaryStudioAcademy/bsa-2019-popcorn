import React from 'react';
import FeedList from '../../MainPage/FeedList/FeedList';
import Spinner from "../../shared/Spinner";
interface IProps {
    userPosts?:any,// todo
    getUsersPosts: () => any
}


const UserPosts: React.FC<IProps> = ({userPosts, getUsersPosts}) => {
    if(!userPosts) {
        getUsersPosts();
        return <Spinner/>
    }
    return (
        <div className={"UserPosts"}>
            <FeedList posts={userPosts}/>
        </div>
    );
};

export default UserPosts;