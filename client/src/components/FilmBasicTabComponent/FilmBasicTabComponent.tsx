import React from 'react';
import PropTypes from 'prop-types';
import './FilmBasicTabComponent.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    film: {
        title: string,
        releaseYear: number,
        genres: string[],
        duration: string,
        description: string,
        rate: number,
        budget: number,
        image: {
            link: string,
        }
        video: {
            link: string,
        }
    }
}

const solidStar = (key: number, type: boolean) => (
    <FontAwesomeIcon
        icon={faStar}
        className={type ? "yellowStar" : "greyStar"}
        key={key}
    />
);

const rateBlock = (rate: number) => {
    const res = [];
    for (let i = 0; i < 5; i++) {
        i < rate ? res.push(solidStar(i, true)) : res.push(solidStar(i, false))
    }
    return res;
}

const FilmBasicTab = (props: IProps) => {
    const {
        title,
        releaseYear,
        genres,
        duration,
        description,
        rate,
        budget,
        image: { link: imageLink },
        video: { link: videoLink }
    } = props.film;
    return (
        <section className="filmSection">
            <div className="posterWrapper">
                <img src={imageLink} alt={title} className="poster" />
            </div>
            <div className="descriptionWrapper">
                <ul className="descriptionList">
                    <li className="descriptionItem">
                        <p className="descriptionTitle">Original title:</p>
                        <p className="descriptionBody">{title}</p>
                    </li>
                    <li className="descriptionItem">
                        <p className="descriptionTitle">Release year:</p>
                        <p className="descriptionBody">{releaseYear}</p>
                    </li>
                    <li className="descriptionItem">
                        <p className="descriptionTitle">{genres.length > 1 ? "Genres" : "Genre"}:</p>
                        <p className="descriptionBody">
                            {
                                genres.join(', ')
                            }
                        </p>
                    </li>
                    <li className="descriptionItem">
                        <p className="descriptionTitle">Duration:</p>
                        <p className="descriptionBody">{duration}</p>
                    </li>
                    <li className="descriptionItem">
                        <p className="descriptionTitle">Description:</p>
                        <p className="descriptionBody">{description}</p>
                    </li>
                    <li className="descriptionItem">
                        <p className="descriptionTitle">Rating:</p>
                        <p className="descriptionBody">
                            {
                                rateBlock(rate)
                            }
                        </p>
                    </li>
                    <li className="descriptionItem">
                        <p className="descriptionTitle">Budget:</p>
                        <p className="descriptionBody">{budget}$</p>
                    </li>
                </ul>
            </div>
            <div className="videoWrapper">
                <iframe
                    className="video"
                    src={videoLink}
                    frameBorder="0"
                    title={videoLink}
                >
                </iframe>
            </div>
        </section>
    );
};

FilmBasicTab.propTypes = {
    film: PropTypes.object,
};

const filmMock = {
    title: "Inglourious Basterds",
    releaseYear: 2009,
    genres: ["Adventure", "Drama", "War"],
    duration: "153 min",
    description: "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
    rate: 4,
    budget: 75000000,
    image: {
        link: "https://m.media-amazon.com/images/M/MV5BOTJiNDEzOWYtMTVjOC00ZjlmLWE0NGMtZmE1OWVmZDQ2OWJhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SY1000_SX675_AL_.jpg"
    },
    video: {
        link: "https://www.youtube.com/embed/KnrRy6kSFF0"
    }
};

FilmBasicTab.defaultProps = {
    film: filmMock
}

export default FilmBasicTab;