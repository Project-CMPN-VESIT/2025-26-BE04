import React from "react";

const Spinner = ({ text }) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinner} />
      {text && <p style={styles.text}>{text}</p>}

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: "40px 0",
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: "5px solid #e0e0e0",
    borderTop: "5px solid var(--primary-color)",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  text: {
    marginTop: "12px",
    fontSize: "14px",
    color: "var(--primary-color)",
  },
};

export default Spinner;
