import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import "./UserSurveys.scss";

interface ISurvey {
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

interface IProps {
    mainPath: string,
    updateInfo: (ISurvey) => void
    deleteSurvey: (ISurvey) => void
    surveys: Array<ISurvey>
}

const UserSurveys: React.FC<IProps> = (props: IProps) => {
    const { mainPath } = props;

    const [ state, setState ] = useState([ ...props.surveys ]);
    const [ deletedSurvey, setDeletedSurvey ] = useState(-1);

    const showModal = (event, id) => { 
        event.preventDefault();
        setDeletedSurvey(id) 
    };

    const deleteSurvey = () => {
        const newState = [ ...state ];
        props.deleteSurvey(state[deletedSurvey]);
        newState.splice(deletedSurvey, 1);
        setState(newState);
        setDeletedSurvey(-1);
    }

    const typeSurveyBttn = (survey) => {
        if (survey.type === 'Close') return (
            <button 
                onClick={(event) => { openSurvey(event, survey.id) }}
                type="button"
            >
                Open survey
            </button>
        );
        return (
            <button 
                    onClick={(event) => { closeSurvey(event, survey.id) }}
                    type="button"
                >
                    Close survey
            </button>
        );
    }

    const openSurvey = (event, id) => {
        event.preventDefault();
        const newState = state.map(survey => {
            if (survey.id === id) {
                props.updateInfo({ ...survey, type: 'Open' })
                return { ...survey, type: 'Open' };
            }
            return survey;
        });
        setState(newState);
    }

    const closeSurvey = (event, id) => {
        event.preventDefault();
        const newState = state.map(survey => {
            if (survey.id === id) {
                props.updateInfo({ ...survey, type: 'Close' })
                return { ...survey, type: 'Close' };
            }
            return survey;
        });
        setState(newState);
    }

    const modalIsShown = () => {
        if ( deletedSurvey === -1 ) return null;
        return (
            <div className="modal-delete-container">
                <div className="modal-delete">
                    <p>Are you sure you want to delete this survey?</p>
                    <button className="delete" onClick={deleteSurvey}>Delete</button>
                    <button onClick={() => { setDeletedSurvey(-1) }}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="userSurveys">
            <NavLink
                to={`${mainPath}/create`}
                className="create-button"
            >
                <button>
                    Create survey
                </button>
            </NavLink>
            <div className="survey-list">
                {
                    state.map((survey, i) => {
                        return (
                            <NavLink 
                                key={i}
                                exact={!i}
                                to={`${mainPath}/${survey.id}`}
                            >
                                <div className="survey-list-item">
                                    <span>{survey.title}</span>
                                    <p className="buttons">
                                        { typeSurveyBttn(survey) }
                                        <button 
                                            className="delete-bttn" 
                                            onClick={(event) => { showModal(event,i) }
                                        }>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </p>
                                </div>
                            </NavLink>
                        )
                    })
                }
            </div>
            { modalIsShown() }
        </div>
    );
}

export default UserSurveys;