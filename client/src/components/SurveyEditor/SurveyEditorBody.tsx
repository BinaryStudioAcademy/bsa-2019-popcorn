import React from 'react';
import SurveyEditor from './SurveyEditor';
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

const SurveyEditorBody: React.FC<IProps> = (props: IProps) => {
    const { mainPath, surveyInfo } = props;

    return (
        <div>
            <header>
                <NavLink to='/userpage/surveys'>go back</NavLink>
                <NavLink to={mainPath}>QUESTIONS</NavLink>
                <NavLink to={`${mainPath}/responses`}>RESPONSES</NavLink>
            </header>
            <Switch>
                <Route exact path={mainPath} render={() => (
                    <SurveyEditor mainPath={mainPath} surveyInfo={surveyInfo} />
                )} />
                <Route path={`${mainPath}/responses`} render={() => (
                    <div>responses</div>
                )} />
            </Switch>
        </div>
    )
}

export default SurveyEditorBody;