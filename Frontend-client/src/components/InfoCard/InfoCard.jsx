import "./InfoCard.css";

function truncateText(text, limit = 105) {
  if (text.length <= limit) return text;
  return text.slice(0, limit).trim() + "...";
}

const InfoCard = ({ info }) => {
  return (
    <div className="info-card-wrapper">
      <div className="info-card-image">
        <img src={info.image_url} />
      </div>
      <div className="info-card-content">
        <div className="info-card-text">
          <div className="info-card-title">{info.title}</div>
          <div className="info-card-desc">{truncateText(info.content)}</div>
        </div>
        <a className="info-card-link buttonized-link" href="#">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default InfoCard;
