import React, {ReactElement} from 'react';
import PropTypes from 'prop-types';
import './FilmBasicTabComponent.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

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

const solidStar = (key: number, type: boolean) : any=> (
    <FontAwesomeIcon
        icon={faStar}
        className={type ? "yellowStar" : "greyStar"}
        key={key}
    />
);

const rateBlock = (rate: number): ReactElement[] => {
    const res :any = [];

    for (let i = 0; i < 5; i++) {
        i < rate ? res.push(solidStar(i, true)) : res.push(solidStar(i, false))
    }
    return res;
};

const descriptionItem = (title: string, body: string | ReactElement[] | number) => (
    <p className="descriptionItem">
        <span className="descriptionTitle">{title}:</span>
        <span className="descriptionBody">{body}</span>
    </p>
);

const FilmBasicTab = (props: IProps) => {
    const {
        title,
        releaseYear,
        genres,
        duration,
        description,
        rate,
        budget,
        image: {link: imageLink},
        video: {link: videoLink}
    } = props.film;

    const movieData = [{
        label: "Original title",
        value: title
    }, {
        label: "Release year",
        value: releaseYear,
    }, {
        label: (genres.length > 1 ? "Genres" : "Genre"),
        value: genres.join(', '),
    }, {
        label: "Duration",
        value: duration,
    }, {
        label: "Description",
        value: description,
    }, {
        label: "Rating",
        value: rateBlock(rate),
    }, {
        label: "Budget",
        value: `${budget}$`,
    }
    ];

    return (
        <div className={"film-basic-wrp"}>
            <section className="filmSection">
                <div className="posterWrapper">
                    <img src={imageLink} alt={title} className="poster"/>
                </div>
                <div className="descriptionWrapper">
                    {movieData.map(({label, value}) => descriptionItem(label, value))}
                </div>
            </section>
            <section>
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
        </div>

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