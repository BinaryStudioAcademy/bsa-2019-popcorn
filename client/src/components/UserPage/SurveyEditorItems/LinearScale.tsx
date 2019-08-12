import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import './SurveyItem.scss';
import {isEqual} from 'lodash';

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

class LinearScale extends Component<IProps, IQuestion> {
    constructor(props: IProps) {
        super(props);
        this.state = { ...props.questionInfo };
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.questionInfo, this.state)){
            this.setState({ ...nextProps.questionInfo });
            console.log('received');

        }
    }

    ChangeValue = (event) => {
        const options = Array(Number(event.target.value)).fill(0).map((e, i) => ({
            id: uuid(),
            question_id: this.state.id,
            value: `${i + 1}` 
        }));

        this.props.changeQuestion({ ...this.state, options });
    } 

    changeLabel = (event, label) => {
        let newQuestion;
        if (label === 'first') {
            newQuestion = { ...this.state, firstLabel: event.target.value }
        } else {
            newQuestion = { ...this.state, lastLabel: event.target.value }
        }

        this.props.changeQuestion(newQuestion);
    }

    render() {
        const { options, firstLabel, lastLabel } = this.state;
        const values = Array(9).fill(0).map((e,i)=> i + 2);
        if (!options) return;

        return (
            <div className="question-body linear-scale">
                <div className="scale-value">
                    <span>1 —</span>
                    <select onChange={this.ChangeValue} value={ options[options.length - 1].value }>
                        {
                            values.map(i => (
                                <option key={i} value={i}>{i}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="scale-labels">
                    <label>
                        1
                        <input 
                            type="text" 
                            onChange={(event) => { this.changeLabel(event, 'first') }} 
                            value={firstLabel ? firstLabel : ''}
                            placeholder="Label"
                        />
                    </label>
                    <label>
                        {options.length}
                        <input 
                            type="text" 
                            value={lastLabel ? lastLabel : ''} 
                            onChange={(event) => { this.changeLabel(event, 'last') }}
                            placeholder="Label"
                        />
                    </label>
                </div>
            </div>
        );
    }
};

export default LinearScale;