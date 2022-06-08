import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Linegroupchart } from "../../charts/linegroup-chart";
import { dayChartFormatter, DAYS } from "../../../constants";

export const DayReportsChart = ({ title }) => {
  const { days } = useSelector((store) => store.report);

  const dayreport = useMemo(() => dayChartFormatter(days), [days]);
  return <Linegroupchart datasets={dayreport} labels={DAYS} title={title} />;
};
