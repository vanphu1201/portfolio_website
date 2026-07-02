import { useState } from "react";
import "./styles/TechStackNew.css";
import { useTranslation } from "../hooks/useTranslation";

interface TechItem {
  name: string;
  icon: string;
  url: string;
  level: number;
  label: "Expert" | "Advanced" | "Intermediate";
}

const techStack: TechItem[][] = [
  // Row 1 - 12 items (largest)
  [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", url: "https://python.org", level: 95, label: "Expert" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", level: 90, label: "Expert" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", url: "https://typescriptlang.org", level: 85, label: "Advanced" },
    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", url: "https://en.cppreference.com/w/c", level: 75, label: "Intermediate" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", url: "https://isocpp.org", level: 80, label: "Advanced" },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", url: "https://kotlinlang.org", level: 70, label: "Intermediate" },
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", level: 90, label: "Expert" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", level: 90, label: "Expert" },
    { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg", url: "https://www.gnu.org/software/bash/", level: 80, label: "Advanced" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", url: "https://react.dev", level: 90, label: "Expert" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", url: "https://nextjs.org", level: 85, label: "Advanced" },
    { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", url: "https://getbootstrap.com", level: 80, label: "Advanced" },
  ],
  // Row 2 - 10 items
  [
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", url: "https://nodejs.org", level: 75, label: "Intermediate" },
    { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", url: "https://djangoproject.com", level: 80, label: "Advanced" },
    { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", url: "https://flask.palletsprojects.com", level: 80, label: "Advanced" },
    { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", url: "https://fastapi.tiangolo.com", level: 85, label: "Advanced" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", url: "https://tensorflow.org", level: 75, label: "Intermediate" },
    { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", url: "https://pytorch.org", level: 85, label: "Advanced" },
    { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg", url: "https://scikit-learn.org", level: 80, label: "Advanced" },
    { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", url: "https://opencv.org", level: 85, label: "Advanced" },
    { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", url: "https://numpy.org", level: 85, label: "Advanced" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", url: "https://tailwindcss.com", level: 85, label: "Advanced" },
  ],
  // Row 3 - 8 items
  [
    { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", url: "https://pandas.pydata.org", level: 85, label: "Advanced" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", url: "https://mysql.com", level: 80, label: "Advanced" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", url: "https://postgresql.org", level: 80, label: "Advanced" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", url: "https://mongodb.com", level: 75, label: "Intermediate" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", url: "https://firebase.google.com", level: 80, label: "Advanced" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", url: "https://redis.io", level: 70, label: "Intermediate" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", url: "https://docker.com", level: 75, label: "Intermediate" },
    { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", url: "https://azure.microsoft.com", level: 70, label: "Intermediate" },
  ],
  // Row 4 - 6 items
  [
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", url: "https://git-scm.com", level: 90, label: "Expert" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", url: "https://github.com", level: 90, label: "Expert" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", url: "https://linux.org", level: 80, label: "Advanced" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", url: "https://aws.amazon.com", level: 75, label: "Intermediate" },
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", url: "https://code.visualstudio.com", level: 90, label: "Expert" },
    { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", url: "https://vercel.com", level: 80, label: "Advanced" },
  ],
  // Row 5 - 4 items
  [
    { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg", url: "https://jupyter.org", level: 85, label: "Advanced" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", url: "https://figma.com", level: 75, label: "Intermediate" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", url: "https://postman.com", level: 85, label: "Advanced" },
    { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg", url: "https://adobe.com/products/photoshop", level: 80, label: "Advanced" },
  ],
  // Row 6 - 2 items (tip of pyramid)
  [
    { name: "Hugging Face", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg", url: "https://huggingface.co", level: 80, label: "Advanced" },
    { name: "MS Office", icon: "https://img.icons8.com/color/48/microsoft-office-2019.png", url: "https://www.microsoft.com/microsoft-365", level: 85, label: "Advanced" },
  ],
];

const TechStackNew = () => {
  const { t } = useTranslation();
  const [activeSkill, setActiveSkill] = useState<TechItem | null>(null);

  return (
    <div className="techstack-new">
      {/* Video Background */}
      <div className="techstack-video-container">
        <video autoPlay loop muted playsInline className="techstack-video">
          <source src="/video/video.webm" type="video/webm" />
        </video>
        {/* Dark Overlay */}
        <div className="techstack-overlay"></div>
      </div>

      {/* Content */}
      <div className="techstack-content">
        <h2>{t('techstack.titleTech')} <span>{t('techstack.titleStack')}</span></h2>
        
        {/* Inverted Pyramid */}
        <div className="techstack-pyramid">
          {techStack.map((row, rowIndex) => (
            <div key={rowIndex} className="techstack-row">
              {row.map((tech, techIndex) => (
                <a
                  key={techIndex}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`techstack-item-node ${activeSkill?.name === tech.name ? "node-active" : ""}`}
                  onMouseEnter={() => setActiveSkill(tech)}
                  onMouseLeave={() => setActiveSkill(null)}
                  data-cursor="disable"
                >
                  <div className="node-icon-wrapper">
                    <img src={tech.icon} alt={tech.name} />
                  </div>
                  <span className="node-tooltip">{tech.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* High-Tech HUD Scan Panel */}
        <div className="tech-hud-panel">
          <div className={`hud-card-wrapper ${activeSkill ? "hud-scanning" : ""}`}>
            {activeSkill ? (
              <div className="hud-content">
                <div className="hud-left">
                  <div className="hud-icon-frame">
                    <img src={activeSkill.icon} alt={activeSkill.name} />
                  </div>
                </div>
                <div className="hud-right">
                  <div className="hud-header">
                    <h4>{activeSkill.name}</h4>
                    <span className={`hud-label-tag ${activeSkill.label.toLowerCase()}`}>
                      {activeSkill.label}
                    </span>
                  </div>
                  <div className="hud-scan-line" />
                  <div className="hud-meter-container">
                    <div className="hud-meter-bar" style={{ width: `${activeSkill.level}%` }} />
                  </div>
                  <div className="hud-meta">
                    <span>{t('techstack.statusActive')}</span>
                    <span>{t('techstack.proficiency')}: {activeSkill.level}%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hud-placeholder">
                <div className="scanner-line-loop" />
                <p>{t('techstack.scanPlaceholder')}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TechStackNew;
