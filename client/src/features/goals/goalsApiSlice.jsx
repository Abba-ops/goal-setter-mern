const API_URL = "/api/goals";

import { apiSlice } from "../apiSlice";

export const goalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createGoal: build.mutation({
      query: (data) => ({
        url: API_URL,
        method: "POST",
        body: data,
      }),
    }),
    getGoals: build.query({
      query: () => ({
        url: API_URL,
        method: "GET",
      }),
    }),
    deleteGoal: build.mutation({
      query: (data) => ({
        url: `${API_URL}/${data}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateGoalMutation,
  useLazyGetGoalsQuery,
  useDeleteGoalMutation,
} = goalsApiSlice;
