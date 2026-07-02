import { Link } from "react-router-dom";
import { config } from "../config";
import "./styles/CallToAction.css";
import { useTranslation } from "../hooks/useTranslation";

const CallToAction = () => {
  const { t } = useTranslation();

  return (
    <div className="cta-section">
      <div className="cta-buttons">
        <Link to="/play" className="cta-btn cta-btn-play" data-cursor="disable">
          {t('cta.playWithMe')}
        </Link>
        
        <a 
          href={config.contact.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cta-btn cta-btn-hire"
          data-cursor="disable"
        >
          {t('cta.hireMe')}
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
