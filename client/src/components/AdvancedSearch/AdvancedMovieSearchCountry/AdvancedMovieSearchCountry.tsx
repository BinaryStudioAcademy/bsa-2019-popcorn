import React from 'react'
import './AdvancedMovieSearchCountry.scss'

type AdvancedMovieSearchCountryProps = {
    countries: Array<string>,
    checkboxHandler:(e?:any)=>void
}

const generateCountries = (countries: Array<string>, handler:(e?:any)=>void) => {
    const countriesArray = countries.map(el => {    
        return <label className="container-checkbox">{el}
            <input type="checkbox" value={el} onChange={()=>handler(el)}/>
            <span className="checkmark-checkbox"></span>
        </label>
    })
    return countriesArray;
}
const AdvancedMovieSearchCountry = (props: AdvancedMovieSearchCountryProps) => {
    return <div className='advanced-movie-search-block'>
        <div className='country-header'>Countries</div>
        <div className='country-block'>
            {generateCountries(props.countries, props.checkboxHandler)}
        </div>
    </div>
}

export default AdvancedMovieSearchCountry;