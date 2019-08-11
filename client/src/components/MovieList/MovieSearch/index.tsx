// @ts-ignore
import searchIcon from "../../../assets/icons/general/header/search-icon.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import MovieList from "../MovieList";

const MovieSearch = ({movies, fetchFilms, alreadySearch, setMovieSeries}) => {
    const [value, setValue] = useState('');

    const startFetchFilms = () => {
        if (value.trim() !== "") {
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
                    <div className="modal">
                        {movies && movies.length > 0 ?
                        <MovieList movies={movies} setMovieSeries={setMovieSeries}/>
                        : <span>Nothing was found</span>}
                    </div>
                    : null}
                </span>
        </div>
    );
};

export default MovieSearch;