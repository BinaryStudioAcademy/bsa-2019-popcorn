import React from 'react';
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import './../Survey/Survey.scss';
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

interface IQuesstion {
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
};

interface IProps {
    questions: Array<IQuesstion>
};

const SurveyStatistics: React.FC<IProps> = (props: IProps) => {
    const { questions } = props;

    const getOptionsKeys = (arr: IOption[]) => arr.map(item => ` ${item.value}`);
    const convertDataForBarChart = (item) => {
        const { answers, options } = item;
        const res = options.map(({ id, value }) => ({ id, [` ${value}`]: 0, label: ` ${value}` }));
        answers.map(({ option_id }) => {
            const index = res.findIndex(item => item.id === option_id);
            const value = Object.keys(res[index])[1];
            ++res[index][value];
        })
        return res;
    }

    const convertDataForPieChart = (item) => {
        const { answers, options } = item;
        const res = options.map(({ id, value }) => ({ id: value, label: value, value: 0, option_id: id }));
        answers.map(({ option_id }) => {
            const index = res.findIndex(item => item.option_id === option_id);
            ++res[index].value;
        })
        return res;
    };

    const checkForAnswers = (questions: IQuesstion[]) => {
        let haveAnswers = true;
        questions.forEach(({ answers }) => {
            if (!answers.length) haveAnswers = false
        })
        return haveAnswers;
    }

    return (
        <div className="survey">
            <div className="survey-background"></div>
            <div className="survey-statistics">
                {
                    checkForAnswers(questions) ? (
                        questions.map(question => (
                            question.options && (
                                <div key={question.id} className="question-container">
                                    <h3 className="survey-question question-title">{question.title}</h3>
                                    <p className="responses-info">{question.answers.length} responses</p>
                                    <div className="barChart">
                                        <BarChart
                                            keys={getOptionsKeys(question.options)}
                                            data={convertDataForBarChart(question)}
                                        />
                                    </div>
                                    <div className="pieChart">
                                        <PieChart data={convertDataForPieChart(question)} />
                                    </div>
                                </div>
                            )
                        ))
                    ) : (
                            <h3>This survey doesnt have any responses</h3>
                        )
                }
            </div>
        </div>
    );
};

export default SurveyStatistics;