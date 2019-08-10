import React from 'react';
import { v4 as uuid } from 'uuid';
import './SurveyItem.scss';

const ShortAnswer: React.FC = () => {
    return (
        <div className="question-body">
                <input disabled placeholder="Short answer" type="text"/>
        </div>
    );
}

export default ShortAnswer;
