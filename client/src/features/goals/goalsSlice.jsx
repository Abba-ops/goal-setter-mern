import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goals: null,
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    resetGoals: () => initialState,
    addGoal: (state, action) => {
      state.goals.push(action.payload);
    },
    setGoals: (state, action) => {
      state.goals = action.payload;
    },
    removeGoal: (state, action) => {
      state.goals = state.goals.filter(
        (goal) => goal._id !== action.payload.id
      );
    },
  },
});

export const { resetGoals, addGoal, setGoals, removeGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
