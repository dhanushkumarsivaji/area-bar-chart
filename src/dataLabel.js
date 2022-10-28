import React from "react";

const DataLabel = ({ header, subHeader, color, textAlign = null }) => {
  return (
    <div style={{margin:'20px 30px'}}>
      <h1
        style={{
          color,
          textAlign: textAlign ? "end" : ""
        }}
      >
        {header}
      </h1>
      <p className="area-chart-label-subheader">{subHeader}</p>
    </div>
  );
};

export default DataLabel;
