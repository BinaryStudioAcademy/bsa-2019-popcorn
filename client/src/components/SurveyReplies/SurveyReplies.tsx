import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import SurveyStatistics from '../SurveyStatistics/SurveyStatistics';
import SurveyIndividual from '../SurveyIndividual/SurveyIndividual';

interface IProps {
    mainPath: string
}

const SurveyReplies: React.FC<IProps> = (props: IProps) => {
    const { mainPath } = props;

    return (
        <div>
            <header>
                <NavLink to={mainPath}>Statistics</NavLink>
                <NavLink to={`${mainPath}/individual`}>Individual</NavLink>
            </header>
            <Switch>
                <Route exact path={mainPath} render={() => (
                    <SurveyStatistics />
                )} />
                <Route path={`${mainPath}/individual`} render={() => (
                    <SurveyIndividual />
                )} />
            </Switch>
        </div>
    )
};

export default SurveyReplies;