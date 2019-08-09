import React from 'react'
import './AdvancedMovieSearchRating.scss'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const railStyle = {
  appearance: 'none',
  width: '100%',
  background: 'orange',
  outline: 'none',
  opacity: '0.7' 
}

type AdvancedMovieSearchRatingProps={
    rangeHandler:(val?:Array<string>) => void
}

class AdvancedMovieSearchRating extends React.Component <AdvancedMovieSearchRatingProps,{}>{
    constructor(props){
    super(props);
    }

    handleRatingChange=(e)=>{
        this.props.rangeHandler(e);
    }

    render(){
    return <div className='advanced-movie-search-block'>
        <div className='rating-header'>Rating</div>
        <div className='slider-wrp'>
        <Range onChange={this.handleRatingChange} id='2' min={0} max={5} step={0.1} marks={{0:'0', 5:'5'}} railStyle={railStyle} defaultValue={[0, 5]} />
        </div>
    </div>
    }
}

export default AdvancedMovieSearchRating;