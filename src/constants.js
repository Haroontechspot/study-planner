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

export const ReportStatus = {
  DAILY: "daily",
  WEEKLY: "weekly",
};

export const DAY_CLASS = {
  [DAYSTATUS.ACTIVE]: "active-day ",
  [DAYSTATUS.PENDING]: "inactive-day",
  [DAYSTATUS.COMPLETED]: "day-filled",
};

export const Colors = {
  [ProgressFields.STUDY]: "#e1b4af",
  [ProgressFields.WORK]: "#e5dceb",
  [ProgressFields.SOCIAL]: "#bed7e1",
  [ProgressFields.PERSONAL]: "#ddedc8",
};

export const piechartdatasetFormatter = (days) => {
  const data = {
    labels: Object.values(ProgressFields),
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [
          Colors[ProgressFields.STUDY],
          Colors[ProgressFields.WORK],
          Colors[ProgressFields.SOCIAL],
          Colors[ProgressFields.PERSONAL],
        ],
        borderColor: [
          Colors[ProgressFields.STUDY],
          Colors[ProgressFields.WORK],
          Colors[ProgressFields.SOCIAL],
          Colors[ProgressFields.PERSONAL],
        ],
        borderWidth: 1,
      },
    ],
  };

  const pf = {
    [ProgressFields.STUDY]: 0,
    [ProgressFields.WORK]: 0,
    [ProgressFields.SOCIAL]: 0,
    [ProgressFields.PERSONAL]: 0,
  };
  days.map((day, index) => {
    if ([DAYSTATUS.COMPLETED, DAYSTATUS.ACTIVE].includes(day.status)) {
      const { progress } = day;
      pf[ProgressFields.STUDY] += progress[ProgressFields.STUDY];
      pf[ProgressFields.WORK] += progress[ProgressFields.WORK];
      pf[ProgressFields.SOCIAL] += progress[ProgressFields.SOCIAL];
      pf[ProgressFields.PERSONAL] += progress[ProgressFields.PERSONAL];
    }
    return day
  });
  data.datasets[0].data = Object.values(pf);
  return data;
};

export const dayChartFormatter = (days) => {
  const datasets = [
    {
      label: ProgressFields.STUDY,
      data: [],
      backgroundColor: Colors[ProgressFields.STUDY],
    },
    {
      label: ProgressFields.WORK,
      data: [],
      backgroundColor: Colors[ProgressFields.WORK],
    },
    {
      label: ProgressFields.SOCIAL,
      data: [],
      backgroundColor: Colors[ProgressFields.SOCIAL],
    },
    {
      label: ProgressFields.PERSONAL,
      data: [],
      backgroundColor: Colors[ProgressFields.PERSONAL],
    },
  ];
  days.map((day, index) => {
    if ([DAYSTATUS.COMPLETED, DAYSTATUS.ACTIVE].includes(day.status)) {
      const { progress } = day;
      datasets.forEach((dataset) => {
        const { data } = dataset;
        const currentProgressValue = progress[dataset.label];
        if (data[index] !== undefined) {
          dataset.data[index] = currentProgressValue;
        } else {
          dataset.data.push(currentProgressValue);
        }
      });
    }
    return day
  });

  return datasets;
};

export const toursteps = [
  {
    selector: ".welcome",
    content: () => (
      <div>
        <h3>Welcome</h3> <br /> <p>Hi there 👋, welcome to the Study Planner</p>
      </div>
    ),
  },
  {
    selector: ".toolhint",
    content:
      "Based on the two options you chose on the previous screen, you have this many hours to allocate to the different categories per week",
  },
  {
    selector: ".personal-dv",
    content: "And you can assign this many hours per day",
  },
  {
    selector: ".fields-container",
    content:
      "Thinking about the selected day, in this case Monday, estimate how much time you spend on a Monday in each category and fill in the appropriate number of hours for each",
  },
  {
    selector: ".daily-chart-report",
    content: "Your hours allocation will be represented here",
  },
  {
    selector: ".days",
    content:
      "Continue filling in the hours for each day until you reach Sunday, after which you can review and print out your week",
  },
  {
    selector: ".hint-btn",
    content: "See this tutorial again by clicking on this button",
  },
];
