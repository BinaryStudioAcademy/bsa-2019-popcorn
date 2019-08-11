import React from 'react';
import AwardContent from './AwardContent/AwardContent';
import AwardStar from './AwardStar/AwardStar';
import "./AwardItem.scss";
interface IAwardItem {
    isWinner: boolean,
    title: string,
    year: number,
    nominationName: string,
    gender: string,
    winnerName?: string
}
const AwardItem: React.FC<IAwardItem> = ({ isWinner, title, year, nominationName, gender, winnerName }) => {
    return (
        <div className="item-wrapper">
            <AwardStar isWinner={isWinner} />
            <AwardContent isWinner={isWinner} title={title} year={year} nominationName={nominationName} gender={gender} winnerName={winnerName} />
        </div>
    );
}

export default AwardItem;