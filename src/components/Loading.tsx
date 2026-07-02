import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import { useTranslation } from "../hooks/useTranslation";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [statusText, setStatusText] = useState("");

  // Update status text based on progress
  useEffect(() => {
    if (percent < 20) setStatusText(t('loading.initializing'));
    else if (percent < 50) setStatusText(t('loading.loadingAssets'));
    else if (percent < 80) setStatusText(t('loading.buildingScene'));
    else if (percent < 100) setStatusText(t('loading.almostReady'));
    else setStatusText(t('loading.ready'));
  }, [percent, t]);

  if (percent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }, 600);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  // Particles positions (static, generated once)
  const particles = [
    { x: "15%", y: "70%", dur: "7s", delay: "0s",   dx: "15px" },
    { x: "30%", y: "80%", dur: "9s", delay: "1.2s",  dx: "-10px" },
    { x: "50%", y: "85%", dur: "6s", delay: "0.5s",  dx: "20px" },
    { x: "65%", y: "75%", dur: "8s", delay: "2s",    dx: "-18px" },
    { x: "80%", y: "65%", dur: "11s", delay: "0.8s", dx: "12px" },
    { x: "20%", y: "40%", dur: "9s", delay: "3s",    dx: "-8px" },
    { x: "75%", y: "30%", dur: "7s", delay: "1.5s",  dx: "10px" },
    { x: "45%", y: "20%", dur: "10s", delay: "2.5s", dx: "-15px" },
  ];

  return (
    <>
      {/* Header */}
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          TranVanPhu
        </a>
      </div>

      {/* Main screen */}
      <div className="loading-screen">
        {/* Ambient rings */}
        <div className="loader-ring loader-ring-1" />
        <div className="loader-ring loader-ring-2" />
        <div className="loader-ring loader-ring-3" />

        {/* Glow orb */}
        <div className="loader-orb" />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="loader-particle"
            style={{
              left: p.x,
              top: p.y,
              "--dur": p.dur,
              "--delay": p.delay,
              "--dx": p.dx,
            } as React.CSSProperties}
          />
        ))}

        {/* Central card */}
        <div className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}>
          {/* Corner brackets */}
          <div className="loader-bracket loader-bracket-tl" />
          <div className="loader-bracket loader-bracket-tr" />
          <div className="loader-bracket loader-bracket-bl" />
          <div className="loader-bracket loader-bracket-br" />

          {/* Name block */}
          <div className="loader-name-block">
            <span className="loader-name-greeting">{t('loading.welcome')}</span>
            <span className="loader-name-main">
              TRAN VAN <span className="loader-name-accent">PHU</span>
            </span>
            <span className="loader-name-role">{t('loading.role')}</span>
          </div>

          {/* Progress */}
          <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
            <div className="loading-progress-track">
              <div
                className="loading-progress-fill"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="loading-status-row">
              <span className="loading-percent">{String(percent).padStart(3, "0")}%</span>
              <span className="loading-status-text">{statusText}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
