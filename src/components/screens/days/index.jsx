import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { DAY_CLASS, ProgressFields as Fields } from "../../../constants";
import { updateDayProgress, moveNext, moveBack } from "../../reducers/report";
import { dayBtnEnabled, findActiveDay, findPrev_Day } from "../../../utils";
import { ProgressFields } from "./progress";
import "../../../scss/days.scss";

const initialState = {
  [Fields.STUDY]: 0,
  [Fields.WORK]: 0,
  [Fields.SOCIAL]: 0,
  [Fields.PERSONAL]: 16,
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
    const cp = progress[Fields.PERSONAL] + progress[name];
    newProgress[Fields.PERSONAL] =
      value > progress[name]
        ? cp - value
        : newProgress[Fields.PERSONAL] + (newProgress[name] - value);

    if (newProgress[Fields.PERSONAL] >= 0) {
      newProgress[name] = value;
      setState({ type: name, payload: value });
      setState({
        type: Fields.PERSONAL,
        payload: newProgress[Fields.PERSONAL],
      });
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
    const preDay = findPrev_Day(days);
    if (
      !progress[Fields.STUDY] &&
      !progress[Fields.SOCIAL] &&
      !progress[Fields.WORK]
    ) {
      if (preDay) {
        setState({ type: "many", payload: preDay.progress });
      } else {
        setState({ type: "many", payload: initialState });
      }
    } else {
      setState({ type: "many", payload: progress });
    }
  }, [activeday]);
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
          <div className="toolhint">
            <strong>{report.recommendedhours} <span>Hrs</span></strong>
            <br />
            Recommended per week
          </div>
          <div className="fields-container">
            <ProgressFields
              label="Study"
              value={progress[Fields.STUDY]}
              name={Fields.STUDY}
              onFocusOut={updateProgress}
            />
            <ProgressFields
              label="Work"
              value={progress[Fields.WORK]}
              name={Fields.WORK}
              onFocusOut={updateProgress}
            />
            <ProgressFields
              label="Social"
              value={progress[Fields.SOCIAL]}
              name={Fields.SOCIAL}
              onFocusOut={updateProgress}
            />
            <ProgressFields
              label="Personal"
              value={progress[Fields.PERSONAL]}
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
