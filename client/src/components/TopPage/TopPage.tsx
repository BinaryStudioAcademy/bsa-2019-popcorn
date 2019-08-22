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
        </div>
    )
}

export default TopPage;
