import React from 'react';
import Moment from 'react-moment';
import { ITop } from './TopPage.service';

interface ITopProps {
    top: ITop;
}

const TopPageTop: React.SFC<ITopProps> = ({
    top
}) => {
    return (
        <div className="top">
            <img src={top.topImageUrl} alt="top-image" />
            <div className="top-description">
                <span className="top-title">{top.title}</span>
                <div className="top-author">
                    <img src={top.user.avatar} alt="author-image" />
                    <span className="top-author-name">{top.user.name}</span>
                </div>
                <span className="top-created-at">
                    <Moment format=" D MMM HH:mm " local>
                        {String(top.created_at)}
                    </Moment>
                </span>
            </div>
        </div>
    )
}

export default TopPageTop;
