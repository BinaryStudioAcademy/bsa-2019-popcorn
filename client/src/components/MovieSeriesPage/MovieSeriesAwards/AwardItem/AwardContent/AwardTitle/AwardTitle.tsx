import React from 'react';
import "./AwardTitle.scss"
interface IAwardTitle {
    title: string,
    year: number
}
const AwardTitle: React.FC<IAwardTitle> = ({ title, year }) => {
    return (
        <div className="title-wrapper">
            <div className="award-title">{title}</div>
            <div className="year">{year}</div>
        </div>
    );
}

export default AwardTitle;