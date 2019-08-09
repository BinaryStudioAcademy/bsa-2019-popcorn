import React, { PureComponent } from 'react';
import Example from "./Chart";
class SurveyStatistics extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Example />
            </div>
        );  
    }
};

export default SurveyStatistics;