import { createSlice } from "@reduxjs/toolkit";
import {
  DAYSTATUS,
  DegreeTypes,
  ProgressFields,
  SemesterUnits,
} from "../../constants";
import { calculateRecommendHours, generateDays } from "../../utils";

const initialState = {
  recommendedhours: calculateRecommendHours(
    DegreeTypes.underPostgraduate,
    SemesterUnits[SemesterUnits.length - 1]
  ),
  degreeType: DegreeTypes.underPostgraduate,
  semesterUnits: SemesterUnits[SemesterUnits.length - 1],
  days: generateDays(),
  buttons: [],
};

const reportReducer = createSlice({
  name: "report",
  initialState,
  reducers: {
    updateRecommendedHours: (state, { payload }) => {
      state.recommendedhours = payload.recommendedhours;
      state.degreeType = payload.degreeType;
      state.semesterUnits = payload.semesterUnits;
    },
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
        const { progress } = days[nextIndex];
        if (
          !progress[ProgressFields.SOCIAL] &&
          !progress[ProgressFields.STUDY] &&
          !progress[ProgressFields.WORK]
        ) {
          days[nextIndex].progress = activeday.progress;
        }
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

export const {
  updateDayProgress,
  moveBack,
  moveNext,
  reset,
  updateRecommendedHours,
} = reportReducer.actions;

export default reportReducer.reducer;
