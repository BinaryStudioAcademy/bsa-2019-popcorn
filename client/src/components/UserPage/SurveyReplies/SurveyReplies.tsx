import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import SurveyStatistics from '../SurveyStatistics/SurveyStatistics';
import SurveyIndividual from '../SurveyIndividual/SurveyIndividual';

interface IProps {
    mainPath: string,
    surveyInfo: {
        id: string,
        created_at: Date,
        title: string,
        type: string,
        description: string,
        user_id: string,
        user: {
            name: string,
            image_link: string
        },
        participants: number,
        questions: Array<{
            id: string,
            survey_id: string,
            title: string,
            firstLabel?: string,
            lastLabel?: string,
            type: string,
            image_link?: string,
            required: boolean,
            options?: Array<{
                id: string,
                question_id: string,
                value: string
            }>,
            answers: Array<{
                id: string,
                question_id: string,
                option_id?: string,
                user_id: string,
                value: string
            }>
        }>
    }
}

const SurveyReplies: React.FC<IProps> = (props: IProps) => {
    const { mainPath, surveyInfo } = props;

    return (
        <div>
            <header>
                <NavLink to={mainPath}>Statistics</NavLink>
                <NavLink to={`${mainPath}/individual`}>Individual</NavLink>
            </header>
            <Switch>
                <Route exact path={mainPath} render={() => (
                    <SurveyStatistics questions={surveyInfo.questions}/>
                )} />
                <Route path={`${mainPath}/individual`} render={() => (
                    <SurveyIndividual surveyInfo={surveyInfo}/>
                )} />
            </Switch>
        </div>
    )
};

export default SurveyReplies;