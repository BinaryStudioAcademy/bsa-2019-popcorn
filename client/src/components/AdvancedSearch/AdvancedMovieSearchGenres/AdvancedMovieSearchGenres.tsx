import React from 'react'
import './AdvancedMovieSearchGenres.scss'

type AdvancedSearchGenresProps = {
    genres: Array<string>,
    checkboxHandler:(genre:string)=>void
}

type AdvancedMovieSearchGenresState = {
    genresSearchValue:string
    avaliableGenres:Array<string>
}

class AdvancedMovieSearchGenres extends React.Component <AdvancedSearchGenresProps, AdvancedMovieSearchGenresState> {
    constructor(props){
        super(props);
        this.state={
            genresSearchValue:'',
            avaliableGenres: this.props.genres
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.generateGenresCheckbox = this.generateGenresCheckbox.bind(this);
    }

    handleSearchChange=(e)=>{
        const filteredGenres = this.props.genres.filter(el=>el.includes(e.target.value));
        this.setState({
            avaliableGenres: filteredGenres,
            genresSearchValue: e.target.value 
        })
    }

    generateGenresCheckbox = (genres:Array<string>) => {
        const genresArray = genres.map(el=>{
          return  <label className="container-checkbox">{el}
          <input onChange={()=>{this.props.checkboxHandler(el)}} type="checkbox" value={el}/>
          <span className="checkmark-checkbox"></span>
        </label>
        })
        return genresArray;
    }

    render(){
    return <div className='advanced-movie-search-block'>
        <div className='genres-header'>Genres</div>
        <input type='text' value={this.state.genresSearchValue} onChange={this.handleSearchChange} className='genres-input' placeholder='Search for a genre'></input>
        <div className='genres-block'>
            {this.generateGenresCheckbox(this.state.avaliableGenres)}
        </div>
    </div>
    }
}

export default AdvancedMovieSearchGenres;