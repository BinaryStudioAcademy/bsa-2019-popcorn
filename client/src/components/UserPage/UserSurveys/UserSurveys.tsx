import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import "./UserSurveys.scss";

interface IProps {
    mainPath: string,
    surveys: Array<{
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
    }>
}

const UserSurveys: React.FC<IProps> = (props: IProps) => {
    const { surveys, mainPath } = props;
    return (
        <div className="userSurveys">
            <NavLink
                to={`${mainPath}/create`}
            >
                <button>
                    <FontAwesomeIcon icon={faPlus} />
                    Create survey
                </button>
            </NavLink>
            <div className="survey-list">
                {
                    surveys.map((survey, i) => {
                        return (
                            <NavLink 
                                key={i}
                                exact={!i}
                                to={`${mainPath}/${survey.id}`}
                            >
                                <div>
                                    <span>{survey.title}</span>
                                    <button>Close survey</button>
                                    <button>Delete</button>
                                </div>
                            </NavLink>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default UserSurveys;