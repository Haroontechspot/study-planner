import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

//components
import { Dropdown, WithBgColor } from "../../index";

//stylesheet
import "../../../scss/splash.scss";
import { useDispatch, useSelector } from "react-redux";
import { DegreeTypes, SemesterUnits } from "../../../constants";
import { calculateRecommendHours } from "../../../utils";
import { updateRecommendedHours } from "../../reducers/report";

const HEADING = "Welcome to the Study Planner";
const DESCRIPTION = `
This study planner will help you get started on planning your day or week, and block out time for study-related activities. For an average subject, you will spend about 10-12 hours per week engaged in on-campus, online or practical activities, self-directed learning, including readings, reflection and completing assessment tasks. Categorising your activities and events around study, social, work, and personal might be useful in making decisions on how you prioritise your time.  
`;

const fieldTypes = {
  degree: "degree",
  unit: "unit",
};

export const Splash = ({ heading = HEADING, description = DESCRIPTION }) => {
  const { degreeType, semesterUnits, recommendedhours } = useSelector(
    (state) => state.report
  );
  const dispatch = useDispatch();

  const generateDegreeTypesOptions = () =>
    Object.values(DegreeTypes).map((dType, index) => ({
      key: index,
      label: dType,
      value: dType,
    }));

  const generateSemesterUnitsOptions = () =>
    SemesterUnits.map((unit) => ({ key: unit, label: unit, value: unit }));

  const onChange = (type, value) => {
    let payload = {
      recommendedhours,
      degreeType,
      semesterUnits,
    };
    if (type === fieldTypes.degree) {
      payload.recommendedhours = calculateRecommendHours(value, semesterUnits);
      payload.degreeType = value;
    } else if (type === fieldTypes.unit) {
      payload.recommendedhours = calculateRecommendHours(degreeType, value);
      payload.semesterUnits = value;
    }
    dispatch(updateRecommendedHours(payload));
  };

  return (
    <WithBgColor custombgColorClass={"splash-container-img"}>
      <div className="splash-container">
        <Row className="heading-container">
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <div>
              <h1 className="heading">{heading}</h1>
            </div>
            <div>
              <p>{description}</p>
            </div>
          </Col>
        </Row>
        <Row className="sub-menu-container">
          <Col className="mt-5" xs="12" sm="12" md="6" lg="6" xl="6">
            <div className="hint-container">
              <div className="hint-text-dv">
                <p>
                  Select what best describes your{" "}
                  <strong>current study load</strong>, then click on ‘Let’s get
                  started.’ In the following screen, you will be able to plan
                  your week by allocating the number of hours that you would
                  spend day to day into four categories: study, social, work,
                  and personal. We have considered the{" "}
                  <strong>8 hours of sleep each day</strong>, so you will need
                  to <strong>allocate the remaining 16 hours</strong> into the
                  different categories, according to your personal
                  circumstances.
                </p>
              </div>
            </div>
          </Col>
          <Col
            className="info-container mt-5"
            xs="12"
            sm="12"
            md="6"
            lg="6"
            xl="6"
          >
            <div className="degree-container d-flex pt-4">
              <span>I am doing:</span>
              <Dropdown
                defaultValue={degreeType}
                options={generateDegreeTypesOptions()}
                onChange={(e) => onChange(fieldTypes.degree, e.target.value)}
              />
            </div>
            <div className="semester-unit d-flex pt-4">
              <span>with:</span>
              <Dropdown
                defaultValue={semesterUnits}
                options={generateSemesterUnitsOptions()}
                onChange={(e) =>
                  onChange(fieldTypes.unit, parseInt(e.target.value))
                }
              />
              <span className="unit-text">units this semester</span>
            </div>
            <div className="pt-4 btn-container">
              <Link to="/home">
                <button className="started-btn btn btn-outline-primary">
                  Let's get started
                </button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </WithBgColor>
  );
};
