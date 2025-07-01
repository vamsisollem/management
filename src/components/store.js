import { create } from "zustand";
import { db } from '../firebase';
import { doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';



const store = (set, get) => ({
  players: [
    { id: 'player1', name: '', wins: Array(13).fill(null), scores: Array(13).fill(0) },
    { id: 'player2', name: '', wins: Array(13).fill(null), scores: Array(13).fill(0) },
    { id: 'player3', name: '', wins: Array(13).fill(null), scores: Array(13).fill(0) },
    { id: 'player4', name: '', wins: Array(13).fill(null), scores: Array(13).fill(0) }
  ],
  roundNumber: 1,
  loading: true,

  // Reset function to clear Firebase data
  resetGame: async () => {
    try {
      const playersRef = doc(db, 'gameData', 'players');
      await deleteDoc(playersRef);
      set({
        players: createInitialPlayers(),
        roundNumber: 1,
        loading: false
      });
    } catch (error) {
      console.error('Reset failed:', error);
    }
  },

  // Player management
  setPlayers: (playerId, value) => set((state) => ({
    players: state.players.map(player =>
      player.id === playerId
        ? { ...player, name: value.trim() }
        : player
    )
  })),

  // Firebase operations
  fetchPlayersData: () => {
    const playersRef = doc(db, 'gameData', 'players');
    const unsubscribe = onSnapshot(playersRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        set({
          players: Array.isArray(data.players) ? data.players : createInitialPlayers(),
          roundNumber: data.roundNumber || 1,
          loading: false
        });
      } else {
        // If no data exists, initialize with default state
        set({
          players: createInitialPlayers(),
          roundNumber: 1,
          loading: false
        });
      }
    });
    return unsubscribe;
  },

  savePlayersData: async () => {
    const state = get();
    const playersRef = doc(db, 'gameData', 'players');
    await setDoc(playersRef, {
      players: state.players,
      roundNumber: state.roundNumber
    });
  },

  // Game logic
  setRoundNumber: () => set((state) => ({ roundNumber: state.roundNumber + 1 })),

  setPlayerData: (playerId, roundIndex, wins, score) => set((state) => ({
    players: state.players.map(player =>
      player.id === playerId
        ? {
            ...player,
            wins: player.wins.map((w, i) => i === roundIndex ? wins : w),
            scores: player.scores.map((s, i) => i === roundIndex ? score : s)
          }
        : player
    )
  })),

  getCurrentWins: () => {
    const currentRound = get().roundNumber - 1;
    return get().players.map(player => player.wins[currentRound] ?? null);
  },

  areAllWinsSet: () => {
    return get().getCurrentWins().every(w => w !== null);
  }
});

export const useStore = create(store);

// No need for getOrderedPlayers anymore since players is already an array