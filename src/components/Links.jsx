import React from 'react'

export const Links = ({
    flag,
    links,
    handleChangeLink,
    language
}) => {
    return (
        <div className="dropdown">
            <div className='lang-box'>
                <img width={20} height={20} style={{alignSelf:'center',marginRight:'.4rem'}} src={new URL(`../img/${flag}`, import.meta.url)} alt="flag-icon" /><span style={{fontFamily:'sans-serif', fontWeight:'lighter'}}>{language}</span>
                <div className="dropdown-content">
                {
                    links?.map((link, i) => (
                        <div key={link.url}>
                                <p className='links'>{i+1} {language} - HD</p>
                                <button onClick={()=>handleChangeLink(link)} className='btn-server'>Server</button>
                        </div>
                    ))
                } 
                </div>
            </div>
        </div>
    )
}
