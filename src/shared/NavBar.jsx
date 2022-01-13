import React from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { SearchBox } from '../components/SearchBox';
import { UseFetch } from '../hooks/useFecth';

export const NavBar = () => {
    const navigate = useNavigate()
    const handleClick = (value) => {
        navigate(`/search/${value}`)
    }
    return (
        <Nav>
            <div className='nav-logo' onClick={()=>navigate('/home')}>
                <Image src="https://i.pinimg.com/600x315/a5/3e/ff/a53eff4ac337a985b0cd294a2a453ef3.jpg"/> 
                <p className='text-white'>Movies Online</p>
            </div>
            <NavContent>
                <ul className="nav-menu">
                    <li><Link to={'/home'}>Inicio</Link></li>
                    <li>Series</li>
                    <li>Categorias</li>
                </ul>
                <SearchBox handleClick={handleClick} />
            </NavContent>
        </Nav>
    )
}


const Nav = styled.nav`
    width: 100%;
    height: 80px;
    display: flex;
    padding-left: 1rem;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    padding-right: 2rem;

    & > .nav-logo {
        color: #fff;
        font-family: 'Roboto', sans-serif;
        display: flex;
        align-items: center;
        font-size: 24px;
    } 

    @media screen and (max-width: 600px) {
        & > .nav-logo {
            display: none;
        }
    }

    
`;

const Image = styled.img`
    height: 80px;
    width: 80px;
    object-fit: contain;
`;

const NavContent = styled.div`
    display: flex;
    & > ul {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 20px;
        padding-right: 3rem;
    }
    
    & > ul > li {
        margin-left: 2rem;
        list-style: none;
        font-family: 'Roboto', sans-serif;
        font-weight: 200 ;
        a{
            color: #fff;
        }
    }

    @media screen and (max-width: 800px) {
       & .nav-menu {
           display: none;
       }
    }
   
`;