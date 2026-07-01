import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <div className="about-bento-grid">
          {/* Card 1: Name & Title (Top, Spans 2 columns) */}
          <div className="bento-card bento-title" data-cursor="disable">
            <div className="title-content">
              <h1>TRAN VAN PHU</h1>
              <div className="divider" />
              <p className="subtitle">AI ENGINEER & FULL-STACK DEVELOPER</p>
            </div>
          </div>

          {/* Card 2: University / Science Club (Middle Top, Spans 2 columns) */}
          <div className="bento-card bento-education" data-cursor="disable">
            <div className="bento-card-header">
              <span className="bento-tag">Academic Journey</span>
            </div>
            <div className="education-details">
              <div className="edu-item">
                <span className="edu-label">UNIVERSITY</span>
                <p>
                  Pursuing Computer Science & Intelligent Systems at <strong>HCMUTE</strong>. Top-tier technical curriculum focused on engineering scalable software architectures and deep learning applications.
                </p>
              </div>
              <div className="edu-divider" />
              <div className="edu-grid">
                <div className="edu-sub-item">
                  <span className="edu-label">COMPETITIONS</span>
                  <p>Active hackathon competitor and AI challenge participant, building real-time tracking pipelines.</p>
                </div>
                <div className="edu-sub-item">
                  <span className="edu-label">RESEARCH</span>
                  <p>Training computer vision models and investigating neural networks for automated video annotations.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Mindset & Night Photography (Middle Left, Col 1) */}
          <div className="bento-card bento-mindset" data-cursor="disable">
            <div className="bento-card-header">
              <span className="bento-tag">Core Value</span>
              <h3>Mindset</h3>
            </div>
            <div className="mindset-content">
              <p className="highlight-text">
                <strong>Building more than software.</strong> My passions provide <strong>discipline</strong> and <strong>focus</strong>.
              </p>
              
              <div className="inner-photo-card">
                <div className="inner-photo-bg" />
                <div className="inner-photo-overlay">
                  <span className="photo-tag">📷 NIGHT PHOTOGRAPHY</span>
                  <p>Mastering body and mind is my path to excellence.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Craft (Middle Right, Col 2) */}
          <div className="bento-card bento-craft" data-cursor="disable">
            <div className="bento-card-header">
              <span className="bento-tag">Engineering</span>
              <h3>Craft</h3>
            </div>
            <div className="craft-content">
              <p className="highlight-text">
                Building scalable <strong>apps</strong>, <strong>websites</strong>, and <strong>automations</strong>.
              </p>
              <p className="craft-desc">
                Leveraging machine learning & modern web stacks to build solutions matching user needs.
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
                <span className="status-text">Available for Hire</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
