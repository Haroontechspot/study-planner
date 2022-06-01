export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const ButtonIds = {
  PREV: "Previous",
  NEXT: "Next",
  FINISH: "Finish",
};

export const DAYSTATUS = {
  ACTIVE: "active",
  PENDING: "pending",
  COMPLETED: "completed",
};

export const ProgressFields = {
  STUDY: "study",
  WORK: "work",
  SOCIAL: "social",
  PERSONAL: "personal",
};

export const DAY_CLASS = {
  [DAYSTATUS.ACTIVE]: "active-day ",
  [DAYSTATUS.PENDING]: "inactive-day",
  [DAYSTATUS.COMPLETED]: "day-filled",
};
