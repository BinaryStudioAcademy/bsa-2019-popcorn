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
                                    <span>{survey.name}</span>
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