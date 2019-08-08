import React from 'react';
import SurveyEditorBody from './SurveyEditorBody';
import Survey from '../Survey/Survey';
import "./SurveyEditor.scss";

import { NavLink, Route, Switch } from 'react-router-dom';

interface IProps {
    mainPath: string,
    surveyInfo : {
        created_at: Date
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