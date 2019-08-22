import React from 'react';
import Moment from 'react-moment';
import { ITop } from '../TopPage.service';

import './TopPageTop.scss';

interface ITopProps {
    top: ITop;
}

const TopPageTop: React.SFC<ITopProps> = ({
    top
}) => {
    return (
        <div className="top">
            <div className="top-poster-wrp">
                <img src={top.topImageUrl} alt="top-image" className="top-poster" />
            </div>
            <div className="top-info">
                <span className="top-title">{top.title}</span>
                <div className="top-author">
                    {/* <div className="top-poster-wrp"> */}
                        <img src={top.user.avatar} alt="author-image" className="top-user-avatar" />
                    {/* </div> */}
                    <span className="top-author-name">{top.user.name}</span>
                </div>
                <span className="top-created-at">
                    <Moment format=" D MMM YYYY " local>
                        {String(top.created_at)}
                    </Moment>
                </span>
            </div>
        </div>
    )
}

export default TopPageTop;
