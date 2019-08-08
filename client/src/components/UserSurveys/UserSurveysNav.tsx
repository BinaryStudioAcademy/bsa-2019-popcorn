import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SurveyEditorNav from '../SurveyEditor/SurveyEditorNav';
import UserSurveys from './UserSurveys';

interface IProps {
    mainPath: string,
    surveys: Array<{
        id: string,
        created_at: Date,
        name: string,
        userInfo: {
            name: string,
            image_url: string
        },
        description: string,
        participants: number,
        questions: Array<{
            id: string,
            question: string,
            options: Array<{
                text: string,
                id: string
            }>,
            type: string
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