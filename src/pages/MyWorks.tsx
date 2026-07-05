import { Link } from "react-router-dom";
import { config } from "../config";
import "./MyWorks.css";
import { useTranslation } from "../hooks/useTranslation";

const MyWorks = () => {
  const { language } = useTranslation();

  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← {language === 'vi' ? 'Quay lại Trang chủ' : 'Back to Home'}
        </Link>
        <h1>
          {language === 'vi' ? <>Tất cả <span>Dự án</span></> : <>All <span>Works</span></>}
        </h1>
        <p>{language === 'vi' ? 'Bộ sưu tập tất cả các dự án và sáng tạo của tôi' : 'A collection of all my projects and creations'}</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <div className="myworks-card" key={project.id} data-cursor="disable">
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="myworks-card-info">
              <h3>{project.title}</h3>
              <p className="myworks-card-category">{project.category}</p>
              <p className="myworks-card-description">
                {language === 'vi' ? project.descriptionVi || project.description : project.description}
              </p>
              <p className="myworks-card-tech">{project.technologies}</p>
              
              <div className="myworks-card-links">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noreferrer" className="myworks-link-btn">
                    GitHub
                  </a>
                )}
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="myworks-link-btn live">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
