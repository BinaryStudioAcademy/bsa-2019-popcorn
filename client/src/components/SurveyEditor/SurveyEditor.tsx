import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
    mainPath: string,
    surveyInfo: {
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
    }
}

class SurveyEditor extends PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { mainPath } = this.props;

        return (
            <div>
                <NavLink
                    to={`${mainPath}/preview`}
                >
                    <div>preview</div>
                </NavLink>
                <form>
                    <input type="text" value="Title" className="survey-title" />
                    <textarea placeholder="Description" />
                    <button type="button">Add question</button>
                </form>
            </div>
        )
    }
}

export default SurveyEditor;