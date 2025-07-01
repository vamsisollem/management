import React, { useEffect, useState } from 'react';
import { useStore } from './store';

function Scores() {
  const { 
    players,
    roundNumber,
    savePlayersData,
    fetchPlayersData,
    setRoundNumber,
    setPlayerData,
    getCurrentWins,
    areAllWinsSet,
    loading,
    resetGame
  } = useStore();
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = fetchPlayersData();
    return () => unsubscribe();
  }, [fetchPlayersData]);

  const validateWins = () => {
    const sum = getCurrentWins().reduce((a, b) => a + b, 0);
    if (sum === roundNumber) {
      setError(`Total wins (${sum}) cannot equal round number (${roundNumber})!`);
      return false;
    }
    setError('');
    return true;
  };

  const handleWinsChange = (playerId, value) => {
    let numericValue = Number(value);
    if (isNaN(numericValue) || numericValue < 0) numericValue = 0;
    if (numericValue > roundNumber) numericValue = roundNumber;

    const currentRound = roundNumber - 1;
    const player = players.find(p => p.id === playerId);
    setPlayerData(playerId, currentRound, numericValue, player.scores[currentRound]);

    if (areAllWinsSet()) validateWins();
  };

  const handleWinClick = (playerId) => {
    const currentRound = roundNumber - 1;
    const wins = players[playerId].wins[currentRound];
    const score = (wins + 1) * 10 + wins;
    setPlayerData(playerId, currentRound, wins, score);
  };

  const handleLossClick = (playerId) => {
    const currentRound = roundNumber - 1;
    setPlayerData(playerId, currentRound, 0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!areAllWinsSet()) {
      setError('All players must enter their wins!');
      return;
    }

    try {
      await savePlayersData();
      setRoundNumber();
      setError('');
    } catch (err) {
      console.error('Save failed:', err);
      setError('Failed to save round');
    }
  };

  const determineWinner = () => {
    const totals = players.map(p => p.scores.reduce((a, b) => a + b, 0));
    const maxScore = Math.max(...totals);
    return players
      .filter(p => p.scores.reduce((a, b) => a + b, 0) === maxScore)
      .map(p => p.name || `Player ${p.id.slice(-1)}`);
  };

  if (loading) return <div className="text-center p-4">Loading game data...</div>;

  return (
    <div className="w-full p-4 bg-gray-100 min-h-screen">
      <button
        onClick={resetGame}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Reset Game
      </button>
      <table className="w-full bg-white shadow-lg rounded-lg p-2">
        <thead className="bg-green-600 text-white text-xs">
          <tr>
            <th className="p-2 text-left">Round</th>
            {players.map((player, index) => (
              <th key={player.id} className="p-3 text-left">
                {player.name || `Player ${index + 1}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 13 }).map((_, i) => (
            <tr key={i} className="border-b">
              <td className="p-2 text-xs">Round{i + 1}</td>
              {players.map((player) => (
                <td key={player.id} className="p-3">
                  {player.scores[i] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {roundNumber <= 13 ? (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Round {roundNumber}</h2>
          {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {players.map((player, index) => (
                <div key={player.id} className="flex items-center gap-4 p-2 text-sm bg-gray-50 rounded">
                  <label className="flex-1 font-medium">
                    {player.name || `Player ${index + 1}`}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={roundNumber}
                    value={player.wins[roundNumber - 1] ?? ''}
                    onChange={(e) => handleWinsChange(player.id, e.target.value)}
                    className="w-20 px-2 py-1 border rounded"
                    placeholder="Wins"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleWinClick(player.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Wons
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLossClick(player.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Lost
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold"
            >
              Save Round {roundNumber}
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
          <p className="text-xl">
            Winner{determineWinner().length > 1 ? 's' : ''}: {' '}
            <span className="text-green-600 font-semibold">
              {determineWinner().join(', ')}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Scores;