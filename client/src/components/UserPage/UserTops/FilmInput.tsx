import React from 'react';
import closeIcon from './../../../assets/icons/general/closeIcon.svg';

interface IInputProps {
    movie: { id: number, title: string };
    deleteFilmInput: (movieId: number) => void
}
const FilmInput: React.FC<IInputProps> = ({ movie, deleteFilmInput }) => {
    return (
        <div
            key={movie.id}
            className="film-input-item search-area">
            <input type="text" className="film-input" placeholder="Type film here"
                defaultValue={movie.title}
            />
            <img src={closeIcon} onClick={() => deleteFilmInput(movie.id)} alt="close" />
        </div>
    )
}

export default FilmInput;