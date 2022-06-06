import { createSlice } from "@reduxjs/toolkit";
import { DAYSTATUS } from "../constants";
import { generateDays } from "../utils";

const initialState = {
  days: generateDays(),
  buttons: [],
};

const reportReducer = createSlice({
  name: "report",
  initialState,
  reducers: {
    updateDayProgress: (state, { payload }) => {
      const { days } = state;
      const index = days.findIndex((day) => day.id === payload.id);
      if (index !== -1) {
        days[index] = payload;
      }
    },
    moveNext: (state, { payload }) => {
      const activeday = payload;
      const { days } = state;
      const currentDayIndex = days.findIndex((day) => day.id === activeday.id);
      days[currentDayIndex].status = DAYSTATUS.COMPLETED;
      days[currentDayIndex].progress = activeday.progress;
      if (currentDayIndex !== -1 && currentDayIndex < days.length - 1) {
        const nextIndex = currentDayIndex + 1;
        days[nextIndex].status = DAYSTATUS.ACTIVE;
        days[nextIndex].progress = activeday.progress;
      }
    },
    moveBack: (state, { payload }) => {
      const activeday = payload;
      const { days } = state;
      const currentDayIndex = days.findIndex((day) => day.id === activeday.id);
      days[currentDayIndex].status = DAYSTATUS.COMPLETED;
      if (currentDayIndex !== -1 && currentDayIndex > 0) {
        const nextIndex = currentDayIndex - 1;
        days[nextIndex].status = DAYSTATUS.ACTIVE;
      }
    },
    reset: (state) => (state = initialState),
  },
});

export const { updateDayProgress, moveBack, moveNext,reset } = reportReducer.actions;

export default reportReducer.reducer;
