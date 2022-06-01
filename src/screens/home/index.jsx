import React from "react";
import { Col, Row } from "react-bootstrap";

//components
import { WithBgColor } from "../../components";
import { Days } from "../days";
import './home.scss';

export const Home = () => (
  <WithBgColor>
    <div className="home-container">
      <Row>
        <Col sm={12} xs={12} md={4} lg={4}>
          <Days />
        </Col>
        <Col>
          <div>Home page</div>
        </Col>
      </Row>
    </div>
  </WithBgColor>
);
