import React from "react";
import { unstable_HistoryRouter } from "react-router-dom";

export const ForwardBack = () => {
  const history = unstable_HistoryRouter();
  console.log("history ", history);
  return (
    <div>
      <button>Back</button>
      <button>Continue</button>
    </div>
  );
};
