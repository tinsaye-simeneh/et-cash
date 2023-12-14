import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const betslipSlice = createSlice({
  name: "betslip",
  initialState,
  reducers: {
    addGame: (state, action) => {
      if (action.payload.gameType === "Keno") {
        if (action.payload.game === "Heads and Tails") {
          state.value = state.value.filter((game) => {
            if (
              (action.payload.value === "HEADS" ||
                action.payload.value === "TAILS") &&
              (game.value === "HEADS" || game.value === "TAILS")
            ) {
              return false;
            } else if (
              action.payload.value === "EVENS" &&
              game.value === "EVENS"
            ) {
              return false;
            } else {
              return true;
            }
          });
        } else {
          state.value = state.value.filter((game) => {
            if (action.payload.value === game.value) {
              return false;
            } else {
              return true;
            }
          });
        }
        if (action.payload.value) {
          state.value.push({
            ...action.payload,
            gameUuid: action.payload.gameUuid, // Add gameUuid here
          });
        }
      } else {
        let exist = false;
        state.value = state.value.filter((game) => {
          if (
            game.gameType === action.payload.gameType &&
            game.value === action.payload.value &&
            game.game === action.payload.game
          ) {
            exist = true;
            return false;
          } else {
            return true;
          }
        });
        if (!exist) {
          state.value.push(action.payload);
        }
      }
    },
    removeGame: (state, action) => {
      state.value = state.value.filter((game) => {
        return game.date !== action.payload;
      });
    },
    removeGames: (state) => {
      state.value = [];
    },
    changeInput: (state, action) => {
      state.value.forEach((game) => {
        if (game.date === action.payload.date) {
          game.amount = action.payload.value;
        }
      });
    },
    changeValue: (state, action) => {
      state.value.forEach((game) => {
        if (game.date === action.payload.date) {
          game.amount += action.payload.value;
        }
      });
    },
    IncreaseValue: (state, action) => {
      state.value.forEach((game) => {
        game.amount = action.payload;
      });
    },
  },
});

export const {
  addGame,
  removeGame,
  removeGames,
  changeInput,
  changeValue,
  IncreaseValue,
} = betslipSlice.actions;

export default betslipSlice.reducer;
