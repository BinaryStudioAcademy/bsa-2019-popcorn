// @ts-ignore
import searchIcon from "../../assets/icons/header/search-icon.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import MovieList from "../MovieList/MovieList";
import {fetchFilms} from "../Header/actions";

const MovieSearch = ({movies, fetchFilms, alreadySearch}) => {
    const [value, setValue] = useState('');

    const startFetchFilms = () => {
        if(value.trim() !== "") {
            console.log(value);
            fetchFilms(value.trim())
        }
    };

    return (
        <div className={"search-area hover"}>
            <span className={"search"}>
                    <img className={"search-icon hover"} src={searchIcon} alt={"search"} onClick={startFetchFilms}/>
                    <input type="text" placeholder="Search" value={value} className="search-input"
                           onChange={(e) => setValue(e.target.value)}/>
                </span>
            <span className="filter hover">
                    Filter
                    <FontAwesomeIcon icon={faChevronDown}/>
                {alreadySearch ?
                    (movies && movies.length > 0 ?
                <div className="modal">
                        <MovieList movies={movies}/>
                </div> : <span>Nothing was found</span>)
                    : null}
                </span>
        </div>
    );
};

export default MovieSearch;