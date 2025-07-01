import React, { useEffect } from 'react';
import  {useStore}  from './store';
import { useNavigate } from 'react-router-dom';
import iconHeart from '/images/iconHeart.png';
import iconSpades from '/images/iconSpades.png';
import iconDiamonds from '/images/iconDiamonds.png';
import iconClubs from '/images/iconClubs.png';

function Players() {
  const { players, setPlayers, savePlayersData} = useStore();
  const navigate = useNavigate();
 

  const handleSubmit = (e) => {
    e.preventDefault();
    savePlayersData(); // Save players' data to Firestore
    navigate('/scores');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-2">
      <div className='w-full flex justify-around'>
        <img src={iconHeart} alt='icon of ace heart suit'></img>
        <img src={iconClubs} alt='icon of ace clubs suit'></img>
        <img src={iconDiamonds} alt='icon of ace Diamonds suit'></img>
        <img src={iconSpades} alt='icon of ace spades suit'></img>
      </div>
      <div className="border-1 border-transparent p-4 rounded-md drop-shadow-lg bg-linear-to-b from-red-500 to-black w-full">
        <h1 className="mb-4 text-2xl font-bold text-center">Who is playing?</h1>
        <form className="grid grid-rows-4 gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="player1"
            value={players.player1?.name || ''}
            onChange={(e) => setPlayers('player1', e.target.value)}
            className='border-1 border-white rounded-md p-2 placeholder-white text-white outline-none'
            required
          />
          <input
            type="text"
            placeholder="player2"
            value={players.player2?.name || ''}
            onChange={(e) => setPlayers('player2', e.target.value)}
            className='border-1 border-white rounded-md p-2 placeholder-white text-white outline-none'
            required
          />
          <input
            type="text"
            placeholder="player3"
            value={players.player3?.name || ''}
            onChange={(e) => setPlayers('player3', e.target.value)}
            className='border-1 border-white rounded-md p-2 placeholder-white text-white outline-none'
            required
          />
          <input
            type="text"
            placeholder="player4"
            value={players.player4?.name || ''}
            onChange={(e) => setPlayers('player4', e.target.value)}
            className='border-1 border-white rounded-md p-2 placeholder-white text-white outline-none'
            required
          />
          <button type="submit" className="bg-red-500 text-white px-2 py-1 w-fit rounded-lg mx-auto mt-4 cursor-pointer hover:text-sm">
            Begin
          </button>
        </form>
      </div>
    </div>
  );
}

export default Players;
