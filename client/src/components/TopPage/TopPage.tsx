import React from 'react';

interface ITopPageProps {
	match: {
		path: string;
		params: any;
    };
}

const TopPage: React.SFC<ITopPageProps> = ({
	match
}) => {
    return (
        <div className="top-page">
            {`top-page/${match.params.id}`}
            <div className="top">
                <img src="" alt="top-image" />
                <div className="top-description">
                    <span className="top-title"></span>
                    <div className="top-author">
                        <img src="" alt="author-image" />
                        <span className="top-author-name"></span>
                    </div>
                    <span className="top-created-at"></span>
                </div>
            </div>
            <div className="top-movie-list">
                <ol>
                    <li className="top-movie-list-item">
                        <img src="" alt="movie-image" />
                        <div className="movie-description">
                            <div>
                                <span className="movie-title"></span>
                                <span className="movie-year"></span>
                            </div>
                            <div className="movie-genres">

                            </div>
                            <span className="author-comment"></span>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default TopPage;
