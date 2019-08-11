import React from 'react';
import PostList from '../../MainPage/PostList/PostList';
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
        <div className="UserPosts">
            <PostList/>
        </div>
    );
};

export default UserPosts;