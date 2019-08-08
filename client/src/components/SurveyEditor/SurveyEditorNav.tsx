import React from 'react';
import SurveyEditorBody from './SurveyEditorBody';
import Survey from '../Survey/Survey';
import "./SurveyEditor.scss";

import { NavLink, Route, Switch } from 'react-router-dom';

interface IProps {
    mainPath: string,
    surveyInfo : {
        id: string,
        created_at: string,
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
            firstLabel: string,
            lastLabel: string,
            type: string,
            image_link: string,
            required: boolean,
            options: Array<{
                id: string,
                question_id: string,
                value: string
            }>,
            answers: Array<{
                id: string,
                question_id: string,
                option_id: string,
                user_id: string,
                value: string
            }>
        }>
    }
}

const SurveyEditorNav: React.FC<IProps> = (props: IProps) => {
    const { mainPath, surveyInfo } = props;

    return (
        <div className="survey-editor">

            <Switch>
                <Route exact path={mainPath} render={() => (
                    <SurveyEditorBody mainPath={mainPath} surveyInfo={surveyInfo} />
                )} />
                <Route exact path={`${mainPath}/responses`} render={() => (
                    <SurveyEditorBody mainPath={mainPath} surveyInfo={surveyInfo} />
                )} />
                <Route exact path={`${mainPath}/responses/individual`} render={() => (
                    <SurveyEditorBody mainPath={mainPath} surveyInfo={surveyInfo} />
                )} />
                <Route exact path={`${mainPath}/preview`} render={() => (
                    <div>
                        <NavLink to={mainPath}>go back</NavLink>
                        <Survey surveyInfo={surveyInfo} />
                    </div>
                )} />
            </Switch>
        </div>
    )
}

export default SurveyEditorNav;