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
        const newOption = {
            id: uuid(),
            question_id: this.state.id,
            value: 'Option'
        };

        const options = this.state.options;
        if (!options) return;
        options.push(newOption);

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
            <div className={`${type.slice(0, 5)} survey-question`}> 
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
                            />
                        </div>
                    ))
                }
                <div className="option-container">
                    <p className="option-icon"></p>
                    <input id={uuid()} type="text" onClick={this.addOption} placeholder="Add option" />
                </div>
            </div>
        )
    }
};

export default MultipleChoice;