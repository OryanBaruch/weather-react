// @ts-nocheck
import React , {useState} from 'react';
import { useFavorite } from '../../hooks/useFavorite';
// import { Heart } from '../../icons';
import './FavoriteButton.css';
import Heart from "react-animated-heart";

function FavoriteButton({ location })
{
    const [isClick, setClick] = useState(false);
    const [ isFavorite, toggleFavorite ] = useFavorite( location );
    const cssClass = `favorite-toggle-button ${ isFavorite ? 'is-favorite' : '' }`;

    const handleClick=()=>{
        setClick(!isClick)
        toggleFavorite()
    }

    return (
        <button 
        onClick={ handleClick } className='icon-heart'>
            <Heart isClick={isFavorite} />
        </button>
    )
}

export default FavoriteButton;