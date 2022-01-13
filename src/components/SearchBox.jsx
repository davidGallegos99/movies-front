import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import SearchContext from '../context/SearchContext';

export const SearchBox = ({
    handleClick
}) => {
    const [state, setstate] = useState('');
    const queryContext = useContext(SearchContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(state.trim() !== '') queryContext.setQuery(state);
        handleClick(state);
    }
    return (
        <form onSubmit={handleSubmit} className="Hotbg">
            <input type="text" onChange={(e)=> {
                
                setstate(e.target.value);
            }} name="" className="Hotbg-txt" placeholder="Buscar" />
            <a href="#" className="Hotbg-btn">
                <i className="fa fa-search"></i>
            </a>
        </form>
    )
}


