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
    questionInfo: IQuestion
    changeQuestion: (IQuestion) => void
};

class MultipleChoice extends Component<IProps, IQuestion> {
    constructor(props: IProps) {
        super(props);
        this.state = { ...props.questionInfo }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.type !== nextProps.questionInfo.type) {
            this.setState({ ...nextProps.questionInfo });
        }
    }

    addOption = () => {
        const options = this.state.options;
        if (!options) return;
        const value = options.length + 1;
        const newOption = {
            id: uuid(),
            question_id: this.state.id,
            value: ``
        };

        options.push(newOption);

        this.props.changeQuestion({ ...this.state, options });
        this.setState({ ...this.state, options });
    }

    changeInput = (event, id) => {
        let { options } = this.state;
        if (!options) return;
        options = options.map(option => {
            if (id === option.id) {
                option.value = event.target.value;
            }
            return option;
        });

        this.setState({ ...this.state, options });
    }

    render() {
        const { options, type } = this.state;
        console.log()

        return (
            <div className={`${type.slice(0, 5)} question-body`}> 
                {   
                    options !== undefined &&
                    options.map((option, i) => (
                        <div key={i} className="option-container">
                            <p className="option-icon"></p>
                            <input 
                                onChange={(event) => {this.changeInput(event, option.id)}} 
                                type="text" 
                                value={option.value} 
                                className="option"
                                placeholder="option*"
                            />
                        </div>
                    ))
                }
                <div className="option-container">
                    <p className="option-icon"></p>
                    <button type="button" onClick={this.addOption}>Add option</button>
                </div>
            </div>
        )
    }
};

export default MultipleChoice;