import { DAYS, DAYSTATUS, ProgressFields } from "./constants";

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

export const dayBtnEnabled = (days, activeday) => {
  const currentIndex = days.findIndex((day) => day.id === activeday.id);
  return {
    nextEnabled: currentIndex < days.length - 1,
    prevEnabled: currentIndex > 0,
  };
};
