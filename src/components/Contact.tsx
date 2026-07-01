import { useState, useEffect } from "react";
import { MdArrowOutward, MdCopyright, MdCheckCircle } from "react-icons/md";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
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
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
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
        <h3 className="contact-main-heading">Let's Connect</h3>
        
        <div className="contact-grid-layout">
          
          {/* Left Column: Contact details & Socials */}
          <div className="contact-info-left">
            <div className="contact-info-group">
              <h4>Email</h4>
              <p>
                <a href={`mailto:${config.contact.email}`} className="contact-email-link" data-cursor="disable">
                  {config.contact.email}
                </a>
              </p>
              
              <h4>Location</h4>
              <p>
                <span className="contact-location-text">{config.social.location}</span>
              </p>
            </div>

            <div className="contact-socials-group">
              <h4>Social Links</h4>
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
              <h2>
                Designed and Developed <br /> by <span>{config.developer.fullName}</span>
              </h2>
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
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out, Tran Van Phu will get back to you shortly.</p>
                  <button 
                    onClick={() => setStatus("idle")} 
                    className="send-another-btn"
                    data-cursor="disable"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-element">
                  <h3>Send a Message</h3>
                  
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className={errors.name ? "error-input" : ""}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      placeholder="e.g. johndoe@example.com"
                      className={errors.email ? "error-input" : ""}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea 
                      id="message"
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange}
                      placeholder="Let's build something awesome together..."
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
                        <span className="spinner-dot" /> Sending...
                      </span>
                    ) : (
                      "Send Message →"
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
