import React from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

export const MovieCard = ({
    movie
}) => {
    const navigate = useNavigate()
    const handleClick = (e) => {
        localStorage.setItem('movie',JSON.stringify(movie));
        navigate('/movie');
    }
    return (
        <Card className='card'>
            <div className="img">
                <img src={movie.poster} alt={movie.title} />
            </div>
            <p className='movie-title'>{movie.title}</p>
            <Badge>
                {movie.year || 'N/A'}
            </Badge>
            <div id={movie.id} className="description">
                <div style={{border:'2px groove white', borderRadius:'3px',overflow:'hidden'}}>

                <Img src={movie.poster} alt="" />
                </div>
                <div className="texto">
                    <p className='des-card'>{movie.title}</p>
                    <div className="release">
                        <p style={{color:'#edb709', fontWeight:'bolder'}}>{Number(movie.rating).toFixed(2)}/5 </p>
                        <p style={{color:'#8da0bc', fontWeight:'bold'}}>&nbsp;&nbsp; {movie?.duration}</p>
                        <p style={{color:'#8da0bc', fontWeight:'bold'}}>&nbsp;&nbsp; {movie?.year}</p>
                    </div>
                        <p style={{color:'#8da0bc', width:'90%'}}>{movie?.sypnosis}</p>
                        <p style={{color:'#fff',fontWeight:'bold', width:'90%'}}>Director:  
                            <span style={{color:'#8da0bc', fontWeight:'lighter'}}> {movie.director.toString()}</span>
                        </p>
                        <Button onClick={handleClick}>Ver mas</Button>
                </div>
            </div>
        </Card>
    )
}
const Img = styled.img`
        width: 300px;
        height: 300px;
        filter: blur(7px) brightness(65%);
`;
const Button = styled.button`
  border: none;
  background-color: #edb709;
  width: 90%;
  text-align: center;
  height: 24px;
  border-radius: 25px;
  transition: 0.3s ease-in-out;
    margin-top: 1rem;
    &:hover {
        filter: brightness(0.7);
        cursor: pointer;
    }
`;
const Badge = styled.div`
    height: 20px;
    width: 50px;
    background: #007aff;
    position: absolute;
    bottom: 0%;
    right: 0%;
    top: 80%;
    text-align: center;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
`;

const Card = styled.div`
    margin-right: 3rem;
    margin-bottom: 2.4rem;
    position: relative;
    box-sizing: border-box;
    .description {
        transition: .3s ease-in-out;
        display: none;
        opacity: 0;
        z-index: 100;
        top: 5%;
        bottom: 0%;
        left: 75%;
        right: 0%;
        position: absolute;
        height: 200px;
        width: 300px;
       & > .texto{
            position: absolute;
            top: 8%;
            width: 90%;
            right: 50%;
            left: 10%;
            .des-card{
                font-weight: bold;
            }
            p{
                margin-bottom: 10px;
            }
            .release{
                display: flex;
            }
        }
    } 
    .description:hover .img {
            filter: brightness(50%);
    }
    
    .img {
        transition: 0.2s ease-in-out;

        img {
            transition: 0.2s ease-in-out;

            border-radius: 5px;
            box-shadow: -2px 5px 18px -3px #fff;
            object-fit: cover;
        }
    }
    .img img:hover{
        filter: brightness(50%);
        cursor: pointer;
    }
    &:hover .description{
        display: block;
        opacity: 1;
    }


    .movie-title{
        margin-top: 15px;
        font-family: sans-serif;
        text-align: center;
        font-size: 14px;
        width: 200px;
    }
    @media screen and (max-width:700px) {
        margin-right   : 0 ;
       .description {
           position: absolute;
           right: 0%;
           left: -20%;

       }
    }
`;