import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import './SurveyItem.scss';

interface IQuestion {
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
    }>
}

interface IProps { 
    questionInfo: IQuestion,
    changeQuestion: (IQuestion) => void
};

class ShortAnswer extends Component<IProps, IQuestion> {
    constructor(props: IProps) {
        super(props);

        this.state = { ...props.questionInfo };
    }

    componentWillReceiveProps(nextProps) {
        const { options } = this.state;
        if (!options) return;

        if (options[0].value !== nextProps.questionInfo.options[0].value) {
            this.setState({ ...nextProps.questionInfo });
        }
    }

    onChange = (event) => {
        let { options } = this.state;
        if (!options) return;
        options = [ 
            {
                ...options[0],
                value: event.target.value
            }
        ];

        this.props.changeQuestion({ ...this.state, options });        
    }

    render() {
        const { options } = this.state;

        return (
            options !== undefined &&
            <div className="survey-question">
                    <input onChange={this.onChange} value={options[0].value} type="text"/>
            </div>
        );
    }
};

export default ShortAnswer;
