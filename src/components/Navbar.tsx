import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import CommandPalette from "./CommandPalette";
import { useTranslation } from "../hooks/useTranslation";
import "./styles/Navbar.css";
import "./styles/LanguageToggle.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const { language, toggleLanguage, t } = useTranslation();

  useEffect(() => {
    setIsMac(window.navigator.userAgent.includes("Mac"));

    // Keydown listener for Command Palette (Ctrl+K or Cmd+K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenis = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.7,
      touchMultiplier: 2,
      infinite: false,
    });

    // Start paused
    lenis.stop();

    // Handle smooth scroll animation frame
    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Handle navigation links
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section && lenis) {
            const target = document.querySelector(section) as HTMLElement;
            if (target) {
              lenis.scrollTo(target, {
                offset: 0,
                duration: 1.5,
              });
            }
          }
        }
      });
    });

    // Handle resize
    window.addEventListener("resize", () => {
      lenis?.resize();
    });

    return () => {
      lenis?.destroy();
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          TVP
        </a>
        <a
          href="mailto:contact@tranvanphu.dev"
          className="navbar-connect"
          data-cursor="disable"
        >
          contact@tranvanphu.dev
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text={t('navbar.about')} />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text={t('navbar.work')} />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text={t('navbar.contact')} />
            </a>
          </li>
          <li style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="navbar-search-trigger"
              data-cursor="disable"
              style={{
                background: "transparent",
                border: "none",
                color: "#eae5ec",
                cursor: "pointer",
                padding: "0",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "inherit",
                fontWeight: "inherit",
              }}
            >
              <HoverLinks text={t('navbar.search')} />
              <span className="search-kbd-badge" style={{
                fontSize: "9px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                padding: "2px 5px",
                borderRadius: "4px",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "monospace",
                marginLeft: "2px",
                lineHeight: "1"
              }}>
                {isMac ? "⌘K" : "Ctrl+K"}
              </span>
            </button>
          </li>
          <li style={{ display: "flex", alignItems: "center" }}>
            <div className="lang-toggle-wrapper">
              <div
                className={`lang-toggle ${language === 'vi' ? 'vi' : 'en'}`}
                onClick={toggleLanguage}
                data-cursor="disable"
                title={language === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'}
              >
                <div className="lang-toggle-slider" />
                <button
                  className={`lang-option ${language === 'en' ? 'active' : ''}`}
                  type="button"
                  tabIndex={-1}
                >
                  EN
                </button>
                <button
                  className={`lang-option ${language === 'vi' ? 'active' : ''}`}
                  type="button"
                  tabIndex={-1}
                >
                  VN
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>

      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </>
  );
};

export default Navbar;
