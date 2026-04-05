import "./ProgressBar.css";

const ProgressBar = ({ value, foreground, background, text, height }) => {
  return (
    <div style={{ background }} className="progress-bar-wrapper">
      <div
        className="progress-bar-completed"
        style={{
          width: `${Math.min(value, 100)}%`,
          background: foreground,
          height,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default ProgressBar;
