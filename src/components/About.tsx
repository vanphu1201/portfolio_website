import "./styles/About.css";
import { useTranslation } from "../hooks/useTranslation";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <div className="about-bento-grid">
          {/* Card 1: Name & Title (Top, Spans 2 columns) */}
          <div className="bento-card bento-title" data-cursor="disable">
            <div className="title-content">
              <h1>{t('about.name')}</h1>
              <div className="divider" />
              <p className="subtitle">{t('about.subtitle')}</p>
            </div>
          </div>

          {/* Card 2: University / Science Club (Middle Top, Spans 2 columns) */}
          <div className="bento-card bento-education" data-cursor="disable">
            <div className="bento-card-header">
              <span className="bento-tag">{t('about.academicTag')}</span>
            </div>
            <div className="education-details">
              <div className="edu-item">
                <span className="edu-label">{t('about.university')}</span>
                <p dangerouslySetInnerHTML={{ __html: t('about.universityDesc') }} />
              </div>
              <div className="edu-divider" />
              <div className="edu-grid">
                <div className="edu-sub-item">
                  <span className="edu-label">{t('about.competitions')}</span>
                  <p>{t('about.competitionsDesc')}</p>
                </div>
                <div className="edu-sub-item">
                  <span className="edu-label">{t('about.research')}</span>
                  <p>{t('about.researchDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Mindset & Night Photography (Middle Left, Col 1) */}
          <div className="bento-card bento-mindset" data-cursor="disable">
            <div className="bento-card-header">
              <span className="bento-tag">{t('about.coreValueTag')}</span>
              <h3>{t('about.mindset')}</h3>
            </div>
            <div className="mindset-content">
              <p className="highlight-text" dangerouslySetInnerHTML={{ __html: t('about.mindsetText') }} />
              
              <div className="inner-photo-card">
                <div className="inner-photo-bg" />
                <div className="inner-photo-overlay">
                  <span className="photo-tag">{t('about.photoTag')}</span>
                  <p>{t('about.photoDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Craft (Middle Right, Col 2) */}
          <div className="bento-card bento-craft" data-cursor="disable">
            <div className="bento-card-header">
              <span className="bento-tag">{t('about.engineeringTag')}</span>
              <h3>{t('about.craft')}</h3>
            </div>
            <div className="craft-content">
              <p className="highlight-text" dangerouslySetInnerHTML={{ __html: t('about.craftText') }} />
              <p className="craft-desc">
                {t('about.craftDesc')}
              </p>
              
              <div className="tech-marquee-mini">
                <span className="tech-badge">Python</span>
                <span className="tech-badge">Next.js</span>
                <span className="tech-badge">YOLOv8</span>
                <span className="tech-badge">React</span>
                <span className="tech-badge">PyTorch</span>
                <span className="tech-badge">Docker</span>
              </div>

              <div className="collab-status">
                <span className="status-dot green-pulse" />
                <span className="status-text">{t('about.availableStatus')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
