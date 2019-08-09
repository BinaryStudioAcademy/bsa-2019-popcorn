import React from 'react'
import AdvancedMovieSearchGenres from '../AdvancedMovieSearchGenres/AdvancedMovieSearchGenres'
import AdvancedMovieSearchBudget from '../AdvancedMovieSearchBudget/AdvancedMovieSearchBudget'
import AdvancedMovieSearchRating from '../AdvancedMovieSearchRating/AdvancedMovieSearchRating'
import AdvancedMovieSearchCountry from '../AdvancedMovieSearchCountry/AdvancedMovieSearchCountry'
import './AdvancedMovieSearch.scss'

const mockedGenres = ['horror','comedy','action', 'thriller', 'crime', 'drama', 'documentary', 'history','music','mystery'];
const mockedCountries = ['UK', 'USA', 'Japan', 'France', 'Spain', 'Germany'];

type AdvancedMovieSearchState = {
    genresValues:Array<string>,
    budgetValues:Array<string>,
    ratingValues:Array<number>,
    countryValues:Array<string>
}

class AdvancedMovieSearch extends React.Component <{}, AdvancedMovieSearchState> {
    constructor(props){
        super(props);
        this.state={
            genresValues:[],
            budgetValues:[],
            ratingValues:[],
            countryValues:[] 
        }
        this.handleGenreChange=this.handleGenreChange.bind(this);
        this.handleBudgetChange=this.handleBudgetChange.bind(this);
        this.handleRatingChange=this.handleRatingChange.bind(this);
        this.handleCountryChange=this.handleCountryChange.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
    }

    handleGenreChange=(genre)=>{
        let newGenres=this.state.genresValues
        if(newGenres.includes(genre)===false){
        newGenres.push(genre)
    }
        else{
            newGenres=newGenres.filter((el)=> el!==genre);
        }

        this.setState({
            ...this.state,
            genresValues: newGenres
        }) 
    }

    handleBudgetChange=(budget)=>{
        this.setState({
            ...this.state,
            budgetValues:budget
        })
    }

    handleRatingChange=(val)=>{
        this.setState({
            ...this.state,
            ratingValues:val
        })
    }

    handleCountryChange=(country)=>{
        let newCountries=this.state.countryValues;
        if(newCountries.includes(country)===false){
            newCountries.push(country)
    }
        else{
            newCountries=newCountries.filter((el)=> el!==country);
        }

        this.setState({
            ...this.state,
            countryValues: newCountries
        }) 
    }

    handleSearch=()=>{
        console.log(this.state);
    }
    render(){
    return <div className='advanced-movie-search'>
        <AdvancedMovieSearchGenres checkboxHandler={this.handleGenreChange} genres={mockedGenres}/>
        <AdvancedMovieSearchBudget radioHandler={this.handleBudgetChange}/>
        <AdvancedMovieSearchRating rangeHandler={this.handleRatingChange}/>
        <AdvancedMovieSearchCountry checkboxHandler={this.handleCountryChange} countries={mockedCountries}/>
        <button className='search-button' onClick={this.handleSearch}>Search</button>
    </div>
    }
}

export default AdvancedMovieSearch;