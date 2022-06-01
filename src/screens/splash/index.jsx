import React, { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { BsInfoCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

//components
import { Dropdown, WithTooltip, WithBgColor } from "../../components";

//images
import ScheduleImg from "../../images/logo.png";

//stylesheet
import "../../scss/splash.scss";

const HEADING = "Welcome to the Study Planner";
const DESCRIPTION = `
This study planner will help you get started on planning your day or
week, and block out time for study-related activities. For an average
subject, you will spend about 10-12 hours per week engaged in
on-campus, online or practical activities, self-directed learning,
including readings, reflection and completing assessment tasks.`;
const TootipText = `From the options to the right, select what best describes your current study load, then click on ‘Let’s get started.’ In the next screen, you will be able to plan your week by allocating the number of hours that you would spendday to day into four categories: study, social, work, and personal. We haveconsidered the 8 hours of sleep each day, so you will need to allocate the remaining 16 hours into the different categories, according to your personal circumstances.`;

//<BsInfoCircleFill />
export const Splash = ({ heading = HEADING, description = DESCRIPTION }) => {
  const hintRef = useRef(null);

  return (
    <WithBgColor>
      <div className="splash-container">
        <Row className="heading-container">
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <div>
              <img src={ScheduleImg} className="img-thumbnail" />
            </div>
            <div>
              <h1 className="heading">{heading}</h1>
            </div>
            <div>
              <p>{description}</p>
            </div>
          </Col>
        </Row>
        <Row className="sub-menu-container">
          <Col className="mt-5" xs="12" sm="12" md="8" lg="8" xl="8">
            <WithTooltip tooltipText={TootipText} childRef={hintRef}>
              <div ref={hintRef}>
                <BsInfoCircleFill className="hint-icon" />
              </div>
            </WithTooltip>
          </Col>
          <Col
            className="info-container mt-5"
            xs="12"
            sm="12"
            md="4"
            lg="4"
            xl="4"
          >
            <div className="degree-container d-flex pt-4">
              <span>I am doing:</span>
              <Dropdown
                options={[
                  { key: 1, label: "Double Degree", value: "double degree" },
                ]}
              />
            </div>
            <div className="semester-unit d-flex pt-4">
              <span>with:</span>
              <Dropdown options={[{ key: 1, label: "3", value: "3" }]} />
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
