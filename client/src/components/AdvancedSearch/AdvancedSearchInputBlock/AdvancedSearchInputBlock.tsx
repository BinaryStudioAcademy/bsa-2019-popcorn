import React from 'react'
import ReactPlayer from 'react-player';
import './AdvancedSearchInputBlock.scss'

type AdvancedSearchInputBlockProps={
    header:string,
    handleSearchChange:(val:string)=>void
}

type AdvancedSearchInputBlockState={
    inputValue:string
}

class AdvancedSearchInputBlock extends React.Component <AdvancedSearchInputBlockProps,AdvancedSearchInputBlockState>{
    constructor(props){
        super(props);
        this.state={
            inputValue:''
        }
    }
    
    handleInputChange=(e)=>{
        this.setState({
            inputValue:e.target.value
        });
        this.props.handleSearchChange(e.target.value);
    }

    render(){
    return <div className='advanced-movie-search-block'>
        <div className='input-header'>{this.props.header}</div>
        <input type='text' value={this.state.inputValue} onChange={this.handleInputChange} className='search-input' placeholder={`Search for a ${this.props.header  }`}></input>
    </div>
    }
}

export default AdvancedSearchInputBlock;