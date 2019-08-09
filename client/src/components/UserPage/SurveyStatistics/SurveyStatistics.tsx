import React, { PureComponent } from 'react';
import BarChart from "./BarChart";
import './SurveyStatistics.scss';


interface IOption {
    id: string,
    question_id: string,
    value: string
};

interface IAnswer {
    id: string,
    question_id: string,
    option_id: string,
    user_id: string,
    value: string
};

// interface IQuestion {
//     id: string,
//     survey_id: string,
//     title: string,
//     firstLabel?: string,
//     lastLabel?: string,
//     type: string,
//     image_link?: string,
//     required: boolean,
//     options: Array<IOption>,
//     answers: Array<IAnswer>
// };

interface IProps {
    questions: Array<{
        id: string,
        survey_id: string,
        title: string,
        firstLabel?: string,
        lastLabel?: string,
        type: string,
        image_link?: string,
        required: boolean,
        options?: Array<IOption>,
        answers: Array<{
            id: string,
            question_id: string,
            option_id?: string,
            user_id: string,
            value: string
        }>
    }>
};

const SurveyStatistics: React.FC<IProps> = (props: IProps) => {
    const { questions } = props;

    const getOptionsId = (arr: IOption[]) => arr.map(item => item.id);
    const convertData = (item) => {
        const { answers, options } = item;
        const res = options.map(({ id }) => ({ id, value: 0 }));
        answers.map(({ option_id }) => {
            const index = res.findIndex(item => item.id === option_id);
            ++res[index].value;
        })
        return res;
    }
    return (
        <div className="questions-list">
            {
                questions.map(question => (
                    question.options && (
                        <div key={question.id} className="barChart">
                            {question.title}
                            <BarChart
                                keys={getOptionsId(question.options)}
                                data={convertData(question)}
                            />
                        </div>
                    )
                ))
            }
        </div>
    );
};

export default SurveyStatistics;