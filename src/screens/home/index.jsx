import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Tour from "reactour";

//components
import { WithBgColor } from "../../components";
import { toursteps } from "../../constants";
import { Days } from "../days";
import { DayReportsChart } from "../days-report-chart";
import "../../scss/home.scss";

export const Home = () => {
  const [isTourOpen, setTourOpen] = useState(false);
  return (
    <>
      <WithBgColor custombgColorClass={"home-bg-color"}>
        <div className="home-container">
          <Row>
            <button
              className="hint-btn"
              onClick={() => setTourOpen(!isTourOpen)}
            >
              ?
            </button>
            <Col sm={12} xs={12} md={3} lg={3} className="days-info-container">
              <div className="back-btn-container">
                <Link to="/" className="button-back">
                  <IoIosArrowBack />
                  Back
                </Link>
              </div>
              <Days />
            </Col>
            <Col sm={12} xs={12} md={9} lg={9} className="chart-container">
              <div className="daily-chart-report">
                <DayReportsChart />
              </div>
            </Col>
          </Row>
        </div>
      </WithBgColor>
      <Tour
        startAt={0}
        showNumber={false}
        steps={toursteps}
        isOpen={isTourOpen}
        onRequestClose={() => setTourOpen(false)}
        prevButton={<Button variant="outline-primary">Back</Button>}
        nextButton={<Button variant="outline-primary">Next</Button>}
        lastStepNextButton={
          <Button variant="outline-primary" onClick={() => setTourOpen(false)}>
            Done
          </Button>
        }
      />
    </>
  );
};
