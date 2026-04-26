import { useState, useRef, useEffect } from "react";
import ProgressBar from "../utilities/ProgressBar/ProgressBar";
import "./DonationCard.css";
import { IoShareSocialOutline } from "react-icons/io5";
import {
  IoLogoWhatsapp,
  IoLogoTwitter,
  IoLogoFacebook,
  IoCopyOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";

const DonationCard = ({ donation }) => {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef(null);

  const shareUrl = `${window.location.origin}/donate-to-fundraiser/${donation._id}`;
  const shareText = `Support "${donation.name}" — ${donation.description}`;

  const shareOptions = [
    {
      label: "WhatsApp",
      icon: <IoLogoWhatsapp size={18} />,
      color: "#25D366",
      href: `https://wa.me/?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`,
    },
    {
      label: "Twitter / X",
      icon: <IoLogoTwitter size={18} />,
      color: "#1DA1F2",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Facebook",
      icon: <IoLogoFacebook size={18} />,
      color: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (shareRef.current && !shareRef.current.contains(e.target)) {
        setShareOpen(false);
      }
    };
    if (shareOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [shareOpen]);

  return (
    <div className="donation-card-wrapper">
      <div className="donation-card-image">
        <img src={donation.logo} alt={donation.name} />
      </div>
      <div className="donation-card-content">
        <div className="donation-card-text">
          <div className="title">{donation.name}</div>
          <div className="description">{donation.description}</div>
          {donation.hasGoal && (
            <div className="donation-card-statistics">
              <div className="amount-total-bar">
                <ProgressBar
                  value={(donation.amountRaised / donation.goal) * 100}
                  text={"₹" + donation.amountRaised + " raised"}
                  background="var(--grey)"
                  foreground="var(--accent-01)"
                />
              </div>
              <div className="donation-stat-bottom">
                <div className="total-percentage">
                  <span>
                    {Math.round((donation.amountRaised / donation.goal) * 100)}%
                  </span>{" "}
                  goal reached <div>Target - ₹{donation.goal}</div>
                </div>
                <div className="donation-testimonials"></div>
              </div>
            </div>
          )}
        </div>

        <div className="donation-card-buttons">
          <a
            className="donation-card-button buttonized-link donate-now-button"
            href={`/donate-to-fundraiser/${donation._id}`}
          >
            Donate Now
          </a>

          {/* Share button with dropdown */}
          <div className="share-wrapper" ref={shareRef}>
            <button
              className="donation-card-button share-button"
              onClick={() => setShareOpen((prev) => !prev)}
              aria-label="Share this fundraiser"
            >
              <IoShareSocialOutline
                color="var(--foreground-inverted)"
                size={28}
              />
            </button>

            {shareOpen && (
              <div className="share-dropdown">
                <div className="share-dropdown-title">
                  Share this fundraiser
                </div>

                {shareOptions.map((option) => (
                  <a
                    key={option.label}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-option"
                    onClick={() => setShareOpen(false)}
                  >
                    <span
                      className="share-option-icon"
                      style={{ color: option.color }}
                    >
                      {option.icon}
                    </span>
                    <span className="share-option-label">{option.label}</span>
                  </a>
                ))}

                <button
                  className="share-option copy-link-btn"
                  onClick={handleCopy}
                >
                  <span className="share-option-icon">
                    {copied ? (
                      <IoCheckmarkOutline size={18} color="#22c55e" />
                    ) : (
                      <IoCopyOutline size={18} />
                    )}
                  </span>
                  <span className="share-option-label">
                    {copied ? "Link Copied!" : "Copy Link"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
