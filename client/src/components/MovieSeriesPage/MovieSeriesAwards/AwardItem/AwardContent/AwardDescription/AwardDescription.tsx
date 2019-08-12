import React from 'react';
import "./AwardDescription.scss"
interface IAwardDescription {
    isWinner: boolean,
    nominationName: string,
    gender: string,
    winnerName?: string
}

const AwardDescription: React.FC<IAwardDescription> = ({ isWinner, nominationName, gender, winnerName }) => {
    const achievement = isWinner ? 'Winner' : 'Nomination';
    return (
        <div className="description-wrapper">
            <div className="achievement">{achievement}</div>
            <div className="nominationName">{nominationName}</div>
            <div className="hyphen">&mdash;</div>
            <div className="gender">{gender}</div>
            <div className="winnerName">{winnerName}</div>
        </div>
    );
}

export default AwardDescription;