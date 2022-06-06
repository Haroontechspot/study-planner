import React, { useMemo, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";

import { WithBgColor, Switch, PieChart } from "../../components";
import { DayReportsChart } from "../days-report-chart";
import { reset } from "../../reducers/report";
import { piechartdatasetFormatter, ReportStatus } from "../../constants";
import "../../scss/breakdown.style.scss";


export const BreakDownScreen = () => {
  const [reporStatus, setReportStatus] = useState(ReportStatus.DAILY);
  const { days } = useSelector((store) => store.report);
  const printableRef = useRef(null);

  const piechartdata = useMemo(() => piechartdatasetFormatter(days), [days]);

  const dispatch = useDispatch();
  return (
    <WithBgColor>
      <div className="breakdown-screen container">
        <Row>
          <Col sm={12} xs={12} md={6} lg={6}>
            <div className="dayreport-chart-container" ref={printableRef}>
              <div className="back-btn-container d-flex py-5">
                <Link to="/home" className="button-back">
                  <IoIosArrowBack />
                  Back
                </Link>
              </div>
              <div className="dayreport-heading">
                <h3>Your {reporStatus} breakdown</h3>
              </div>
              <div className={`chart-parent chart-parent-${reporStatus}`}>
                {reporStatus === ReportStatus.DAILY ? (
                  <DayReportsChart title="" />
                ) : (
                  <PieChart data={piechartdata} />
                )}
              </div>
              <div className="action-container">
                <h6>View:</h6>
                <div className="action-buttons">
                  <span
                    className={`daily-text ${
                      reporStatus === ReportStatus.DAILY
                        ? ReportStatus.DAILY
                        : ""
                    }`}
                  >
                    Daily
                  </span>
                  &nbsp;&nbsp;
                  <Switch
                    className={reporStatus}
                    onClick={() =>
                      setReportStatus(
                        reporStatus === ReportStatus.DAILY
                          ? ReportStatus.WEEKLY
                          : ReportStatus.DAILY
                      )
                    }
                    checked={reporStatus === ReportStatus.WEEKLY}
                  />
                  &nbsp;&nbsp;
                  <span
                    className={`weekly-text ${
                      reporStatus === ReportStatus.WEEKLY
                        ? ReportStatus.WEEKLY
                        : ""
                    }`}
                  >
                    Weekly
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} xs={12} md={6} lg={6} className="activity-parent">
            <div className="activity-container">
              <div className="hint-container">
                <p>
                  This report can assist you in planning and scheduling your
                  activities.{" "}
                  <strong>
                    Use your preferred calendar app to create a schedule
                    accordingly
                  </strong>
                  . This can help you get into a routine that works for you and
                  allows you to dedicate your full attention to each aspect of
                  your life at a given time.
                </p>
              </div>
              <div className="button-container">
                <div>
                  <ReactToPrint
                    trigger={() => (
                      <button className="btn btn-outline-primary w-100 export-as-pdf">
                        Export as PDF
                      </button>
                    )}
                    content={() => printableRef.current}
                  />
                </div>
                <div>
                  <Link to="/">
                    <button
                      onClick={() => dispatch(reset())}
                      className="btn btn-outline-secondary w-100 my-3 restart-activity"
                    >
                      Restart Activity
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </WithBgColor>
  );
};
