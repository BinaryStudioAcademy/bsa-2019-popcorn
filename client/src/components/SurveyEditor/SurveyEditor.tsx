import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
    mainPath: string,
    surveyInfo: {
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