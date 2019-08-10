import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import SurveyEditorNav from '../SurveyEditor/SurveyEditorNav';
import UserSurveys from './UserSurveys';
import newSurvey from './newSurveyConfig';

interface IProps {
    mainPath: string,
    surveys: Array<{
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
    }>
}

const { id, userInfo } = {
    "id": "1",
    userInfo: {
        "name": "Parsons",
        "image_link": "https://i.pravatar.cc/300?img=5"
    }
}


const UserSurveysNav: React.FC<IProps> = (props: IProps) => {
    const { surveys, mainPath } = props;

    const [ state, setState ] = useState([...surveys]);

    const updateInfo = newSurvey => {
        const survey = state.some(survey => survey.id === newSurvey.id);

        if (!survey) setState([...state, newSurvey]);
        else {
            const newState = state.map(survey => {
                if (survey.id === newSurvey.id) return newSurvey;
                return survey;
            });
    
            setState([...newState]);
        }
    }

    const deleteSurvey = deletedSurvey => {
        const index = state.indexOf(deletedSurvey);
        const newState = [...state];
        newState.splice(index, 1);
        setState(newState);
    }

    return (
        <Switch>
            <Route exact path={mainPath} render={(props) => (
                <UserSurveys 
                    updateInfo={updateInfo} 
                    surveys={state} 
                    mainPath={mainPath} 
                    deleteSurvey={deleteSurvey}
                />
            )} />
            <Route path={`${mainPath}/create`} render={() => (
                <SurveyEditorNav 
                    mainPath={`${mainPath}/create`} 
                    surveyInfo={{ 
                        ...newSurvey(), 
                        user_id: id, 
                        user: { ...userInfo } 
                    }}
                    updateInfo={updateInfo} 
                />
            )} />
            {
                state.map((survey, i) => (
                    <Route key={i} path={`${mainPath}/${survey.id}`} render={() => (
                        <SurveyEditorNav 
                            updateInfo={updateInfo} 
                            mainPath={`${mainPath}/${survey.id}`} 
                            surveyInfo={survey} 
                        /> 
                    )} />
                ))
            }
        </Switch>
    );
}

export default UserSurveysNav;