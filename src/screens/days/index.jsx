import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { DAY_CLASS, ProgressFields as Fields } from "../../constants";
import { updateDayProgress, moveNext, moveBack } from "../../reducers/report";
import { dayBtnEnabled, findActiveDay } from "../../utils";
import { ProgressFields } from "./progress";
import "../../scss/days.scss";

const initialState = {
  study: 0,
  work: 0,
  social: 0,
  personal: 16,
};

const reducer = (state, action) => {
  switch (action.type) {
    case Fields.STUDY:
      return { ...state, [Fields.STUDY]: action.payload };
    case Fields.SOCIAL:
      return { ...state, [Fields.SOCIAL]: action.payload };
    case Fields.WORK:
      return { ...state, [Fields.WORK]: action.payload };
    case Fields.PERSONAL:
      return { ...state, [Fields.PERSONAL]: action.payload };
    case "many":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const Days = () => {
  const [state, setState] = useReducer(reducer, initialState);
  const { report } = useSelector((store) => store);
  const dispatch = useDispatch();
  const { days } = report;
  const activeday = findActiveDay(days) ?? days[days.length - 1];
  const { progress } = activeday;
  const { prevEnabled, nextEnabled } = dayBtnEnabled(days, activeday);

  const updateProgress = (name, value) => {
    let newProgress = { ...progress };
    const cp = progress.personal + progress[name];
    newProgress.personal =
      value > progress[name]
        ? cp - value
        : newProgress.personal + (newProgress[name] - value);

    if (newProgress.personal >= 0) {
      newProgress[name] = value;
      setState({ type: name, payload: value });
      dispatch(updateDayProgress({ ...activeday, progress: newProgress }));
    }
  };

  const nextDay = () => {
    dispatch(moveNext({ ...activeday, progress: state }));
  };

  const prevDay = () => {
    dispatch(moveBack(activeday));
  };

  useEffect(() => {
    setState({ type: "many", payload: progress });
  }, [progress, activeday]);

  return (
    <div className="day-container">
      <div className="days">
        {days.map(({ id, name, status }, index) => (
          <div key={index + id} className={`day ${DAY_CLASS[status]}`}>
            {name}
          </div>
        ))}
      </div>
      <div className="progress-parent">
        <div className="progress-container" style={{ minHight: 500 }}>
          <div className="toolhint">40 hours recommended per week</div>
          <div className="fields-container">
            <ProgressFields
              label="Study"
              value={progress.study}
              name={Fields.STUDY}
              onFocusOut={updateProgress}
            />
            <ProgressFields
              label="Work"
              value={progress.work}
              name={Fields.WORK}
              onFocusOut={updateProgress}
            />
            <ProgressFields
              label="Social"
              value={progress.social}
              name={Fields.SOCIAL}
              onFocusOut={updateProgress}
            />
            <ProgressFields
              label="Personal"
              value={progress.personal}
              name={Fields.PERSONAL}
              onFocusOut={updateProgress}
              disable={true}
              className="personal-dv"
            />
          </div>
        </div>
        <div className="btn-container">
          <button
            className="btn btn-outline-primary"
            onClick={prevDay}
            disabled={!prevEnabled}
          >
            Prev
          </button>
          {nextEnabled ? (
            <button
              className="btn btn-outline-primary"
              onClick={nextDay}
              disabled={!nextEnabled}
            >
              Next
            </button>
          ) : (
            <button className="btn btn-outline-primary ">
              <Link to="/breakdown">Finish</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
