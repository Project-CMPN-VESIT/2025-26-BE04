import React from "react";
import "./News.css";
import PageBlueprint from "../../components/utilities/PageBlueprint/PageBlueprint";

function News() {
  const openImage = (src) => {
    window.open(src, "_blank", "noopener,noreferrer");
  };

  const newsLinks = [
    {
      href: "http://www.loksatta.com/mumbai-news/railway-policy-hit-care-and-rehabilitation-of-destitute-children-campaign-1191398/",
      label: "हजारो निराश्रित मुलांच्या शोधाचा शेवटच सापडत नाही",
    },
    {
      href: "http://timesofindia.indiatimes.com/india/Chief-secretaries-DGPs-will-be-accountable-for-missing-children-SC/articleshow/44833604.cms",
      label: "Chief secretaries, DGPs will be accountable for missing children: SC",
    },
    {
      href: "http://timesofindia.indiatimes.com/india/Chhattisgarhs-efforts-sluggish-in-tracing-missing-children-SC/articleshow/44839406.cms",
      label: "Chhattisgarh's efforts sluggish in tracing missing children: SC",
    },
    {
      href: "http://www.abc.net.au/news/2015-01-31/child-slaves-in-india-rescued-by-police/6059384",
      label: "Hundreds of child slaves rescued by Indian police in shock raids in Hyderabad",
    },
    {
      href: "http://www.loksatta.com/mumbai-news/child-abuse-violence-increased-1081074/",
      label: "बालकांच्या अपहरणात वाढ",
    },
    {
      href: "http://www.ibnlive.com/news/india/75000-children-have-gone-missing-in-india-govt-594849.php",
      label: "75,000 children have gone missing in India: Govt",
    },
  ];

  return (
    <PageBlueprint title={"NEWS"}>
      <div className="news-main">
        <div className="news-page-wrapper">

          {/* ===== MAIN GRID ===== */}
          <div className="news-grid">

            {/* LEFT COLUMN */}
            <div className="news-left">

              {/* Newspaper images */}
              <div className="news-card">
                <div className="news-card-header">
                  <div className="news-card-header-dot" />
                  <h3>Press Coverage</h3>
                </div>
                <div className="news-card-body">
                  <div className="news-carousel">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n}>
                        <img
                          src={`/src/assets/News/news${n}.jpg`}
                          alt={`News Screenshot ${n}`}
                          className="news-img-clickable"
                          onClick={() => openImage(`/src/assets/News/news${n}.jpg`)}
                          title="Click to enlarge"
                          tabIndex={0}
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            openImage(`/src/assets/News/news${n}.jpg`)
                          }
                        />
                        <p className="news-img-caption">Click to enlarge</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* News links */}
              <div className="news-card">
                <div className="news-card-header">
                  <div className="news-card-header-dot" />
                  <h3>Related News Links</h3>
                </div>
                <div className="news-card-body">
                  <ul className="news-links-list">
                    {newsLinks.map((link, i) => (
                      <li key={i}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="news-link-item"
                        >
                          <span className="news-link-arrow">↗</span>
                          <span className="news-link-text">{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="news-right">

              {/* Interview video */}
              <div className="news-card">
                <div className="news-card-header">
                  <div className="news-card-header-dot" />
                  <h4>Interview — Sadashiv Chavhan, President JSF</h4>
                </div>
                <div className="news-card-body">
                  <a
                    href="https://youtu.be/_N74zfGvctM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="yt-fallback-link"
                  >
                    <div className="yt-thumbnail-container">
                      <img
                        src="https://img.youtube.com/vi/_N74zfGvctM/0.jpg"
                        alt="Watch Interview on YouTube"
                        className="yt-thumbnail"
                      />
                      <span className="yt-play-btn" />
                    </div>
                  </a>
                  <span className="yt-label">Opens on YouTube ↗</span>
                </div>
              </div>

              {/* Infographics */}
              <div className="news-card">
                <div className="news-card-header">
                  <div className="news-card-header-dot" />
                  <h4>Untraceable Children — Data</h4>
                </div>
                <div className="news-card-body">
                  <div className="news-kids-grid">
                    <img
                      src="/src/assets/News/untraceble.png"
                      alt="Untraceable Kids Infographic 1"
                      className="kids-img"
                    />
                    <img
                      src="/src/assets/News/untraceable2.png"
                      alt="Untraceable Kids Infographic 2"
                      className="kids-img"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </PageBlueprint>
  );
}

export default News;
