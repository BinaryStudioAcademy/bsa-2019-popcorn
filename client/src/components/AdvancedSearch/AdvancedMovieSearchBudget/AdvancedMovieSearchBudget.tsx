import React from 'react'
import './AdvancedMovieSearchBudget.scss'

type AdvancedMovieSearchBudgetProps={
    radioHandler:(budget:Array<string>)=>void
}

const AdvancedMovieSearchBudget = (props:AdvancedMovieSearchBudgetProps) => {
    return <div className='advanced-movie-search-block'>
        <div className="budget-header">Budget</div>
        <form>
            <label className="container">&lt;1M
            <input type="radio" onChange={()=>{props.radioHandler(['0','1000000'])}} value={['0','1000000']} name="radio"/>
                <span className="checkmark"></span>
            </label>
            <label className="container">1M-10M
            <input type="radio" onChange={()=>{props.radioHandler(['1000000','10000000'])}} value={['1000000','10000000']} name="radio"/>
                <span className="checkmark"></span>
            </label>
            <label className="container">10M-500M
            <input type="radio" onChange={()=>{props.radioHandler(['10000000','500000000'])}} value={['10000000','500000000']} name="radio"/>
                <span className="checkmark"></span>
            </label>
            <label className="container">500M-1B
            <input type="radio" onChange={()=>{props.radioHandler(['500000000','1000000000'])}} value={['500000000','1000000000']} name="radio" />
                <span className="checkmark"></span>
            </label>
            <label className="container">&gt;1B
            <input type="radio" onChange={()=>{props.radioHandler(['1000000000'])}} value={['1000000000']} name="radio"/>
                <span className="checkmark"></span>
            </label>
        </form>
    </div>
}

export default AdvancedMovieSearchBudget;