import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const repoLinks = [
  "https://github.com/tranvanphu",
  "https://github.com/tranvanphu/football-annotation-cv",
  "https://github.com/tranvanphu/hand-gesture-recognition"
];

const Work = () => {
  useEffect(() => {
    // Disable pinning on mobile to allow scrolling
    if (window.innerWidth <= 768) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Refresh ScrollTrigger after layout settles
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {config.projects.slice(0, 5).map((project, index) => {
            const projectLink = repoLinks[index] || "https://github.com/tranvanphu";
            const techList = project.technologies.split(", ");
            
            return (
              <div className="work-box" key={project.id}>
                {/* Left Side: Info & Text details */}
                <div className="work-info-new">
                  <div className="work-header-new">
                    <span className="project-index">0{index + 1}</span>
                    <span className="project-category-badge">{project.category}</span>
                  </div>
                  
                  <h3 className="project-title-new">{project.title}</h3>
                  <p className="project-desc-new">{project.description}</p>
                  
                  <div className="project-tech-section">
                    <h5 className="tech-heading-new">Tech Stack</h5>
                    <div className="project-tech-grid">
                      {techList.map((tech, idx) => (
                        <span className="project-tech-badge-new" key={idx}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <a 
                    href={projectLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="project-github-btn-new"
                    data-cursor="disable"
                  >
                    View Codebase →
                  </a>
                </div>

                {/* Right Side: Showcase Media */}
                <div className="work-media-new">
                  <div className="media-glow-effect" />
                  <WorkImage image={project.image} alt={project.title} link={projectLink} />
                </div>
              </div>
            );
          })}

          {/* See All Works Button */}
          <div className="work-box work-box-cta">
            <div className="see-all-works">
              <h3>Want to see more?</h3>
              <p>Explore all of my projects and creations</p>
              <Link to="/myworks" className="see-all-btn" data-cursor="disable">
                See All Works →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
