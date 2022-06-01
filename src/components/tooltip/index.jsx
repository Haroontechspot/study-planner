import React, { useRef } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const TooltipButton = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    {props.text}
  </Tooltip>
);

export const TooltipComponent = ({
  children,
  position = "top",
  delay = { show: 250, hide: 400 },
  tooltipText = "default tooltip text",
  childRef,
}) => {
  return (
    <OverlayTrigger
      target={childRef}
      placement={position}
      delay={delay}
      overlay={(props) => <TooltipButton {...props} text={tooltipText} />}
    >
      {children}
    </OverlayTrigger>
  );
};
