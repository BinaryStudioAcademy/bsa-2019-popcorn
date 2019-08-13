import React, { useState } from 'react';
import './TopItem.scss';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/general/closeIcon.svg';
import TopConstructor from './TopConstructor/TopConstructor';

export interface ITopItem {
    title: string;
    id: string;
    moviesList: IMovie[];
}

export interface IMovie { //if needed could be changed
    id: string;
    title: string;
    comment: string;
}

interface ITopItemProps {
    topItem: ITopItem;
    deleteTop: (topId: string) => void;
    saveUserTop: (topItem: ITopItem) => void;
}

const TopItem: React.FC<ITopItemProps> = ({ saveUserTop, topItem, deleteTop }) => {
    const [editTop, canEditTop] = useState(false);
    const [title, setTitle] = useState(topItem.title);

    function toogleEdit() {
        canEditTop(!editTop);
    }

    function saveTop(movies: Array<any>) {
        const moviesList = movies.filter(movie => movie.title.trim() !== "");
        saveUserTop({ ...topItem, moviesList, title });
        canEditTop(false);
    }

    return (
        <div>
            <div className="top-item">
                {editTop || topItem.moviesList.length === 0 ?
                    <input maxLength={140} placeholder="Top name" className="top-title-input" onChange={(e) => setTitle(e.target.value)} value={title} /> :
                    <div className="top-item-title">{title}</div>}
                <div className="edit-top hover" onClick={toogleEdit}>Edit</div>
                <div className="delete-top hover" onClick={() => deleteTop(topItem.id)}>
                    <CloseIcon />
                </div>
            </div>
            {(editTop || topItem.moviesList.length === 0) && <TopConstructor
                moviesList={topItem.moviesList}
                saveTop={saveTop}
            />}
        </div>
    );
}

export default TopItem;