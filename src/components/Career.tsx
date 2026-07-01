import "./styles/Career.css";
import { config } from "../config";

const Career = () => {
  return (
    <div className="career-section section-container" id="experience">
      <div className="career-container">
        <h2>
          My Career <span>&</span>
          <br /> Experience
        </h2>
        <div className="career-info">
          {/* Central Line */}
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          
          {config.experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`career-info-box ${index % 2 === 0 ? "left-box" : "right-box"}`} 
              data-cursor="disable"
            >
              {/* Timeline marker node */}
              <div className="timeline-node">
                <div className="timeline-node-inner" />
              </div>
              
              <div className="career-card-content">
                <div className="career-card-header">
                  <span className="career-period-tag">{exp.period}</span>
                  <span className="career-location-tag">{exp.location}</span>
                </div>
                
                <h4 className="career-card-role">{exp.position}</h4>
                <h5 className="career-card-company">{exp.company}</h5>
                
                <p className="career-card-desc">{exp.description}</p>
                
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="career-responsibilities">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                )}
                
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="career-tech-stack">
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="career-tech-badge">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
