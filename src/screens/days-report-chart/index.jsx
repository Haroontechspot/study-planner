import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Linegroupchart } from "../../components/charts/linegroup-chart";
import {dayChartFormatter, DAYS } from "../../constants";

export const DayReportsChart = ({ title }) => {
  const { days } = useSelector((store) => store.report);

  const dayreport = useMemo(() => dayChartFormatter(days), [days]);
  const Linegroup = useCallback(
    () => <Linegroupchart datasets={dayreport} labels={DAYS} title={title} />,
    [days, title]
  );
  return <Linegroup />;
};
