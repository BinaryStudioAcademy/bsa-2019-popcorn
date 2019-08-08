import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SurveyEditorNav from '../SurveyEditor/SurveyEditorNav';
import UserSurveys from './UserSurveys';

interface IProps {
    mainPath: string,
    surveys: Array<{
        id: string,
        created_at: Date,
        title: string,
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
    }>
}

const UserSurveysNav: React.FC<IProps> = (props: IProps) => {
    const { surveys, mainPath } = props;

    return (
        <Switch>
            <Route exact path={mainPath} render={(props) => (
                <UserSurveys surveys={surveys} mainPath={mainPath} />
            )} />
            <Route path={`${mainPath}/create`} render={() => (
                <SurveyEditorNav mainPath={`${mainPath}/create`} surveyInfo={surveys[0]}/>
            )} />
            {
                surveys.map((survey, i) => (
                    <Route key={i} path={`${mainPath}/${survey.id}`} render={() => (
                        <SurveyEditorNav mainPath={`${mainPath}/${survey.id}`} surveyInfo={survey} /> 
                    )} />
                ))
            }
        </Switch>
    );
}

export default UserSurveysNav;