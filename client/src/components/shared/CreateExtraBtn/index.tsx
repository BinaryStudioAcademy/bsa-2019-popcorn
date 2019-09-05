import React from 'react';
import './CreateExtraBtn.scss';

interface ICreateExtraBtn {
    body: any;
    handleClick: (options?: any) => any;
}

const CreateExtraBtn: React.FC<ICreateExtraBtn> = (props) => {
    const { body, handleClick } = props;

    return (
        <div
            className="create-item-button hover"
            onClick={handleClick}
        >
            {body}
        </div>
    );
};

export default CreateExtraBtn;
