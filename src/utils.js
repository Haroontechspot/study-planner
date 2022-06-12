import { DAYS, DAYSTATUS, ProgressFields, DegreeTypes } from "./constants";

export const calculateRecommendHours = (type, units) => {
  let result = 0;
  if (type === DegreeTypes.postgraduate) {
    result = 12 * units;
  } else if (type === DegreeTypes.underPostgraduate) {
    result = 10 * units;
  }
  return result;
};

export const generateDays = () =>
  DAYS.map((day, index) => ({
    id: day + index,
    name: day,
    status: index === 0 ? DAYSTATUS.ACTIVE : DAYSTATUS.PENDING,
    progress: {
      [ProgressFields.STUDY]: 0,
      [ProgressFields.WORK]: 0,
      [ProgressFields.SOCIAL]: 0,
      [ProgressFields.PERSONAL]: 16,
    },
  }));

export const findActiveDay = (days) =>
  days.find((day) => day.status === DAYSTATUS.ACTIVE);

export const findPrev_Day = (days) => {
  const activeIndex = days.findIndex((day) => day.status === DAYSTATUS.ACTIVE);
  if (activeIndex > 0 && activeIndex < days.length - 1) {
    return days[activeIndex - 1];
  } else {
    return false;
  }
};

export const dayBtnEnabled = (days, activeday) => {
  const currentIndex = days.findIndex((day) => day.id === activeday.id);
  return {
    nextEnabled: currentIndex < days.length - 1,
    prevEnabled: currentIndex > 0,
  };
};
