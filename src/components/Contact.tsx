import { useState, useEffect } from "react";
import { MdArrowOutward, MdCopyright, MdCheckCircle } from "react-icons/md";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "../hooks/useTranslation";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  useEffect(() => {
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    // Animate title from bottom
    contactTimeline.fromTo(
      ".contact-section h3.contact-main-heading",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Animate contact details and form
    contactTimeline.fromTo(
      [".contact-info-left", ".contact-form-right"],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      "-=0.4"
    );

    // Clean up
    return () => {
      contactTimeline.kill();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.errorName');
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errorEmail');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.errorEmailFormat');
    }
    if (!formData.message.trim()) newErrors.message = t('contact.errorMessage');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");

    // Simulate sending message (1.5s delay)
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3 className="contact-main-heading">{t('contact.heading')}</h3>
        
        <div className="contact-grid-layout">
          
          {/* Left Column: Contact details & Socials */}
          <div className="contact-info-left">
            <div className="contact-info-group">
              <h4>{t('contact.email')}</h4>
              <p>
                <a href={`mailto:${config.contact.email}`} className="contact-email-link" data-cursor="disable">
                  {config.contact.email}
                </a>
              </p>
              
              <h4>{t('contact.location')}</h4>
              <p>
                <span className="contact-location-text">{config.social.location}</span>
              </p>
            </div>

            <div className="contact-socials-group">
              <h4>{t('contact.socialLinks')}</h4>
              <div className="contact-social-links-grid">
                <a href={config.contact.github} target="_blank" rel="noopener noreferrer" data-cursor="disable" className="contact-social">
                  Github <MdArrowOutward />
                </a>
                <a href={config.contact.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="disable" className="contact-social">
                  Linkedin <MdArrowOutward />
                </a>
                <a href={config.contact.twitter} target="_blank" rel="noopener noreferrer" data-cursor="disable" className="contact-social">
                  Twitter <MdArrowOutward />
                </a>
                <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer" data-cursor="disable" className="contact-social">
                  Instagram <MdArrowOutward />
                </a>
              </div>
            </div>

            <div className="contact-footer-info">
              <h2 dangerouslySetInnerHTML={{ __html: `${t('contact.designedBy')} <span>${config.developer.fullName}</span>` }} />
              <h5>
                <MdCopyright /> {new Date().getFullYear()}
              </h5>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-right">
            <div className="contact-form-card" data-cursor="disable">
              {status === "success" ? (
                <div className="contact-success-state">
                  <div className="success-icon-wrapper">
                    <MdCheckCircle className="success-icon" />
                  </div>
                  <h3>{t('contact.successTitle')}</h3>
                  <p>{t('contact.successDesc')}</p>
                  <button 
                    onClick={() => setStatus("idle")} 
                    className="send-another-btn"
                    data-cursor="disable"
                  >
                    {t('contact.sendAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-element">
                  <h3>{t('contact.sendMessage')}</h3>
                  
                  <div className="form-group">
                    <label htmlFor="name">{t('contact.yourName')}</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder={t('contact.namePlaceholder')}
                      className={errors.name ? "error-input" : ""}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">{t('contact.yourEmail')}</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder')}
                      className={errors.email ? "error-input" : ""}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">{t('contact.yourMessage')}</label>
                    <textarea 
                      id="message"
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange}
                      placeholder={t('contact.messagePlaceholder')}
                      rows={5}
                      className={errors.message ? "error-input" : ""}
                    />
                    {errors.message && <span className="error-message">{errors.message}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className={`contact-submit-btn ${status === "sending" ? "submitting" : ""}`}
                    disabled={status === "sending"}
                    data-cursor="disable"
                  >
                    {status === "sending" ? (
                      <span className="submit-spinner-text">
                        <span className="spinner-dot" /> {t('contact.sending')}
                      </span>
                    ) : (
                      t('contact.submitBtn')
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
