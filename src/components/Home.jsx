import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components'
import MovieContext from '../context/MovieContext';
import { UseFetch } from '../hooks/useFecth'

export const Home = () => {
    const [reqLastMovies, setreqLastMovies] = UseFetch();
    const [lastMovies, setLastMovies] = useState([]);
    const movieContext = useContext(MovieContext);
    const navigate = useNavigate();

    useEffect(() => {
        setreqLastMovies({
            url: '/lastMovies',
            method: 'get'
        })
    }, [])
    useEffect(()=> {
        if(!reqLastMovies.loading && reqLastMovies.data) {
            let lista = [];
            let dataModelada = reqLastMovies.data.data.slice(0,13)
            let lastAdded = 0;
            dataModelada.forEach((el, index) => {
                if(index != 0 && index%3 == 0) {
                    lista = [...lista, reqLastMovies.data.data.slice(lastAdded,index)];
                    lastAdded = index;
                }
            })
            setLastMovies(lista);
        }
    }, [reqLastMovies.loading, reqLastMovies.error])
    
    const handleMovieClick = (el) => {
        // movieContext.setMovie(el);
        localStorage.setItem('movie', JSON.stringify(el));
        navigate('/movie');
    }

    const printColumns = array => {
        const height = Math.floor((Math.random() * (300 - 220 + 1)) + 220);
        return (
            array.map(el => (
                <img key={el.id} onClick={()=> {handleMovieClick(el)}} style={{background:'',height , objectFit:'initial'}} src={el.poster} alt={el.title} />
            ))
        )
    }
    return (
        <Container>
            <div className="highlights">
                <p>Ultimos estrenos</p>
                <div className="row">
                    {
                        lastMovies.length > 0 && (
                            lastMovies.map((el, i) => (
                                <div key={i} className="column">
                                    {printColumns(el)}
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    margin-bottom: 7rem ;
    color: #fff;
    width: 100%;
    margin-top: 4rem;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
  
    & > .highlights {
        display: flex;
        flex-direction: column;
        & > p {
            text-align: center;
            font-size: 30px;
            font-weight: 700;
            font-family: 'Lato', 'Roboto', sans-serif;
            letter-spacing: 2px;
            margin-bottom: 3rem;
        }

    }
`;