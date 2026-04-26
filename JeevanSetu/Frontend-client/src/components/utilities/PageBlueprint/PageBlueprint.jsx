import "./PageBlueprint.css";

const PageBlueprint = ({ title, children }) => {
  return (
    <div className="page-wrapper">
      <div className="page-title">
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
};

export default PageBlueprint;
