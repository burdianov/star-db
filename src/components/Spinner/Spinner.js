import React from "react";

import "./Spinner.css";

const Spinner = () => {
  return (
    <div class="lds-css">
      <div class="lds-double-ring">
        <div />
        <div />
      </div>
    </div>
  );
};

export default Spinner;
