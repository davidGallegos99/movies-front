import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import styled from 'styled-components'
import MovieContext from '../context/MovieContext';
import { UseFetch } from '../hooks/useFecth';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar/'
import { Preload } from './Preload';
import { Links } from './Links';

export const Movie = () => {
    const [reqLinks, setReqLinks] = UseFetch();
    const movieContext = useContext(MovieContext);
    const [porcentaje, setporcentaje] = useState(0);
    const [links, setlinks] = useState([]);
    const [linkSelected, setlinkSelected] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('movie')) {
            movieContext.setMovie(JSON.parse(localStorage.getItem('movie')));
            setReqLinks({
                url:`/getLinks/${JSON.parse(localStorage.getItem('movie')).id}`,
                method: 'get'
            })
            const text = document.getElementsByTagName('text')[0];
            text.setAttribute('x','30')
            text.setAttribute('y','55')
            const percent = (Number(JSON.parse(localStorage.getItem('movie')).rating)*100) / 5
            setporcentaje(percent.toFixed(0))
            console.log(text.x);
                
        }else {
            navigate('/home');
        }
        printStars(Number(JSON.parse(localStorage.getItem('movie')).rating));

    }, [])

    useEffect(()=> {
        if(!reqLinks.loading && reqLinks.data) {
            const objLinks = reqLinks.data.data[0];
            const selected = objLinks.espanol.length > 0 ? objLinks.espanol[0] : objLinks.latino.length > 0 ? objLinks.latino[0]: objLinks.sub.length > 0 ? objLinks.sub[0] : '';  
            setlinks(reqLinks.data.data)
            setlinkSelected(selected);
        }
    },[reqLinks.loading, reqLinks.error])

    const printStars = (rating) => {
            const decimal = rating%1;
            rating = Math.trunc(rating)
            console.log(rating);
            for (let index = 0; index < rating; index++) {
                document.getElementById('star').innerHTML += ` <i class="fas fa-star"></i>`;
            }
            if(rating > 0 && rating < 5) {
                document.getElementById('star').innerHTML += ` <i class="fas fa-star-half-alt"></i>`;
            }else {
                document.getElementById('star').innerHTML += ` <i class="fas fa-star"></i>`;
            }
            const j = 5 - rating;
            if(decimal > 0) {
                for (let index = 0; index < j-1; index++) {
                    document.getElementById('star').innerHTML += ` <i class="far fa-star"></i>`;
                }
            }else {
                for (let index = 0; index < j; index++) {
                    document.getElementById('star').innerHTML += ` <i class="far fa-star"></i>`;
                }
                
            }
    }

    const handleChangeLink = (link) => {
        console.log(link);
        setlinkSelected(link);
    }

    return (
        <Container>
            <div className="description">
                <img src={movieContext?.movie?.poster} alt={movieContext?.movie?.title} />
                <div className="details">
                    <p className='title'>{movieContext?.movie?.title}</p> 
                    <p className='subtitle'>{movieContext?.movie?.title}</p> 
                    <Points>
                        <div className='circular' style={{width:'40px', height:'40px',textAlign:'left', marginTop:'1rem'}}>
                            <CircularProgressbar 
                            className='rating'
                                text={`${porcentaje}%`}
                            styles={buildStyles({
                                pathColor:'#edb709',
                                trailColor:'#ccc',
                                textColor:'#edb709',
                                textSize:24
                            })}
                                value={porcentaje}
                                strokeWidth={6}

                            />
                        </div>
                        <div className="duration">
                            {movieContext?.movie?.duration} &nbsp;&nbsp;&nbsp;&nbsp;{movieContext?.movie?.year}
                        </div>
                    </Points> 
                        <p style={{fontFamily:'sans-serif',color:'#8da0bc', marginTop:'1rem'}}>{Number(movieContext?.movie?.rating).toFixed(2)} de 5</p>
                        <div id="star" style={{ width:'auto'}}></div>
                        <p style={{lineHeight:'25px',marginBottom:'5px'}} className='sinopsis'>{movieContext?.movie?.sypnosis}</p>
                        <span className='array'><span style={{color:'white', lineHeight:'25px',fontWeight:'bold'}}>Directores: </span> {movieContext?.movie?.director.toString()}</span><br />
                        <span className='array'><span style={{color:'white', lineHeight:'25px',fontWeight:'bold'}}>Generos: </span> {movieContext?.movie?.genres.toString()}</span><br />
                        <span className='array'><span style={{color:'white', lineHeight:'25px',fontWeight:'bold'}}>Actores: </span> {movieContext?.movie?.cast.toString()}</span>
                </div>
            </div>
            <Video className='video'>
                <div className="languages">
                    {
                        links[0]?.espanol?.length > 0 && (
                            <Links 
                                language="Español"
                                flag="spain.png"
                                handleChangeLink={handleChangeLink}
                                links={links[0]?.espanol}
                            />
                        )
                    }

                    {
                        links[0]?.latino?.length > 0 && (
                            <Links 
                                language="Latino"
                                flag="mex.png"
                                handleChangeLink={handleChangeLink}
                                links={links[0]?.latino}
                            />
                        )
                    }

                    {
                        links[0]?.sub?.length > 0 && (
                            <Links 
                                language="Subtitulado"
                                flag="usa.png"
                                handleChangeLink={handleChangeLink}
                                links={links[0]?.sub}
                            />
                        )
                    }
                </div>
                {
                    reqLinks.loading ? (
                        <div style={{marginTop:'25vh'}}>
                            <Preload />
                        </div>
                    ) : (
                        <iframe allowFullScreen  onError={()=>false} style={{width:'100%', height:'75vh'}} src={linkSelected?.url} frameBorder="none"></iframe>             
                    )
                }
            </Video>
        </Container>
    )
}
const Video = styled.div`
margin-top: 7rem;
margin-bottom: 8rem;
border-radius: 5px;
display: flex;
flex-direction: column;
width: 75%;
    .languages {
        height: 60px;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        background: rgba(61,79,145,.5);
    }
    iframe{
        width: 230px;
    }
    @media screen and (max-width:600px) {
        margin-top: 3rem;
        .languages {
            flex-direction: column;
            height: auto;
        }       
    }
`;
const Points = styled.div`
    display: flex;
    align-items:center;
    & > .duration{
        height: 50px;
        border-left: 1px solid #8da0bc;
        margin-left: 4em;
        padding-left: 1.1em;
        color: #8da0bc;
        font-family: sans-serif;
        display: flex;
        align-items: center;
    }

    
`;
const Container = styled.div`
    color: #fff;
    display: flex;
    margin-top: 4rem;
    flex-direction: column;
    align-items: center;
    & > .description {
        width: 75%;
        display: flex;

        & > img {
            border-radius: 4px;
            box-shadow: -2px 5px 18px -3px #fff;
        }
        
        & > .details {
            width: 100%;
            margin-left: 3.5rem;
            & > .title {
                font-size: 2.25rem;
                font-family: sans-serif;
                font-weight: 700;
            }
            & > .subtitle{
                margin-top: 10px;
                font-weight: lighter;
                font-family: sans-serif;
                font-size: 14px;
                color: #8da0bc;
            }
            & > .sinopsis,.array {
                font-size: 15px;
                font-family: sans-serif;
                color: #8da0bc;
                text-align: justify;
                margin-top: 1rem;
        }

    }
}
@media screen and (max-width: 630px) {
    & > .description {
        flex-direction: column;
        width: 100%;
        & > .details {
            width: 80%;
            margin-top: 3rem;

            .sinopsis{
                text-align: start;
            }
        }
        img {
            width: 75%;
            align-self: center;
        }
    }
}
`;