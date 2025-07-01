import React from 'react'
import cards from '/images/cards.jpeg'
import { useNavigate } from 'react-router-dom'
function HomePage() {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate('/players')
    }
  return (
    <div className='bg-black min-h-screen flex flex-col justify-center items-center'>
        <h1 className='text-5xl strokeHeading font-bold text-center'>MANAGEMENT GAME</h1>
        <div className='border-2 border-transparent border-image-container overlay p-2'>
            <img src={cards} alt='image of four aces' className='' />
        </div>
        <p className='text-white mt-2'>You Know who the King is!</p>
        <button className='bg-red-500 text-white p-2 rounded-md mt-4 drop-shadow-lg' onClick={handleClick}>Let's Start</button>
    </div>
  )
}

export default HomePage
