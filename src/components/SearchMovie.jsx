import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import SearchContext from '../context/SearchContext'
import { UseFetch } from '../hooks/useFecth'
import { MovieCard } from './MovieCard'
import { Preload } from './Preload'

export const SearchMovie = () => {
    const params = useParams()
    const [reqSearchByName, setreqSearchByName] = UseFetch();
    const [movies, setmovies] = useState([]);
    const queryContext = useContext(SearchContext);
    useEffect(() => {
        setreqSearchByName({
            url:`/getByName/${params.query}`,
            method:'get'
        })
    }, [])

    useEffect(()=>{
        setreqSearchByName({
            url:`/getByName/${params.query}`,
            method:'get'
        })
    },[queryContext.query])

    useEffect(()=> {
        if(!reqSearchByName.loading && reqSearchByName.data) {
            setmovies(reqSearchByName.data.data);
        }
    },[reqSearchByName.loading, reqSearchByName.error])

    

    return (
        <Container>
            <div className="fila">
                <h2 className="title">{!reqSearchByName.loading && reqSearchByName?.data?.data?.length > 0 ? 'Búsquedas encontradas' : !reqSearchByName.loading && reqSearchByName?.data?.data?.length == 0  ? 'No se encontraron resultados' : reqSearchByName.loading && "Cargando..." }</h2>
                {
                    !reqSearchByName.loading ? (
                        <div className="card-container">
                            {
                                movies.map(movie => (
                                        <MovieCard 
                                            key={movie.id}
                                            movie={movie}
                                        />
                                ))
                            }
                        </div>
                    ) : (
                        <div style={{marginTop:'10rem'}}>
                            <Preload />
                        </div>
                    )
                }
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    align-items: center;
    width: 100%;
    color: #fff;
    font-family: sans-serif;
    .fila {
        width: 75%;
        .title {
            font-size: 2.05rem;
            letter-spacing: -1px;
            font-weight: 600;
        }
        .card-container{
            margin-top: 2rem;
            width: 100%;
            display: flex;
            flex-wrap:wrap;
            justify-content: space-around;
            box-sizing: border-box;
            
        }

    }
    @media screen and (max-width: 600px){
        .fila .card-container {
            justify-content: center;
        }
        .fila .title {
            text-align: center;
        }
    }
`;