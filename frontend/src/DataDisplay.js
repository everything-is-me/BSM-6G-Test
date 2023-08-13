import React from "react";

const DataDisplay = () => {
  return (
    <div>
      <h1>Spectrum Availability Information for Users</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Horizontally center
          alignItems: "center", // Vertically center
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <iframe
          style={{
            background: "#FFFFFF",
            border: "none",
            borderRadius: "2px",
            boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
            width: "1140px",
            height: "480px",
          }}
          src="https://charts.mongodb.com/charts-blockchain-dsm-oqlvh/embed/charts?id=64d16c63-1eba-42b8-81a4-a45d6f33a5bb&maxDataAge=30&theme=light&autoRefresh=true"
        />
        <iframe
          style={{
            background: "#FFFFFF",
            border: "none",
            borderRadius: "2px",
            boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
            width: "540px",
            height: "480px",
          }}
          src="https://charts.mongodb.com/charts-blockchain-dsm-oqlvh/embed/charts?id=9619be70-7eb5-4b95-8ccb-9e7f87614a04&maxDataAge=30&theme=light&autoRefresh=true"
        />
        <iframe
          style={{
            background: "#FFFFFF",
            border: "none",
            borderRadius: "2px",
            boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
            width: "440px",
            height: "280px",
          }}
          src="https://charts.mongodb.com/charts-blockchain-dsm-oqlvh/embed/charts?id=c8cab7c2-89e2-4098-88be-dbdd7a00e4a3&maxDataAge=30&theme=light&autoRefresh=true"
        />
      </div>
    </div>
  );
};

export default DataDisplay;
