import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

//components
import { Dropdown, WithBgColor } from "../../components";

//stylesheet
import "../../scss/splash.scss";

const HEADING = "Welcome to the Study Planner";
const DESCRIPTION = `
This study planner will help you get started on planning your day or
week, and block out time for study-related activities. For an average
subject, you will spend about 10-12 hours per week engaged in
on-campus, online or practical activities, self-directed learning,
including readings, reflection and completing assessment tasks.`;

export const Splash = ({ heading = HEADING, description = DESCRIPTION }) => {
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
                options={[
                  { key: 1, label: "Undergraduate", value: "undergraduate" },
                  { key: 2, label: "Postgraduate", value: "postgraduate" },
                ]}
              />
            </div>
            <div className="semester-unit d-flex pt-4">
              <span>with:</span>
              <Dropdown
                options={[
                  { key: 1, label: "1", value: "1" },
                  { key: 2, label: "2", value: "2" },
                  { key: 3, label: "3", value: "3" },
                  { key: 4, label: "4", value: "4" },
                ]}
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
