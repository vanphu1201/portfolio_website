import React, { useState, useEffect, useRef } from "react";
import { lenis } from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./styles/CommandPalette.css";
import { useTranslation } from "../hooks/useTranslation";

interface CommandItem {
  id: string;
  title: string;
  shortcut?: string;
  category: string;
  action: () => void;
  icon: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setSearch("");
    }
  }, [isOpen]);

  // Handle closing when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const scrollToSection = (id: string) => {
    onClose();
    // If not on home page, navigate to home first
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const target = document.querySelector(id) as HTMLElement;
        if (target && lenis) {
          lenis.scrollTo(target, { offset: 0, duration: 1.5 });
        }
      }, 300);
    } else {
      const target = document.querySelector(id) as HTMLElement;
      if (target && lenis) {
        lenis.scrollTo(target, { offset: 0, duration: 1.5 });
      }
    }
  };

  const commands: CommandItem[] = [
    {
      id: "nav-about",
      title: t('command.goAbout'),
      shortcut: "G A",
      category: t('command.navigation'),
      icon: "👤",
      action: () => scrollToSection("#about"),
    },
    {
      id: "nav-work",
      title: t('command.goWork'),
      shortcut: "G W",
      category: t('command.navigation'),
      icon: "💼",
      action: () => scrollToSection("#work"),
    },
    {
      id: "nav-contact",
      title: t('command.goContact'),
      shortcut: "G C",
      category: t('command.navigation'),
      icon: "📞",
      action: () => scrollToSection("#contact"),
    },
    {
      id: "interact-chess",
      title: t('command.playChess'),
      shortcut: "P C",
      category: t('command.interactions'),
      icon: "♟️",
      action: () => {
        onClose();
        navigate("/play");
      },
    },
    {
      id: "interact-email",
      title: t('command.sendEmail'),
      shortcut: "S E",
      category: t('command.interactions'),
      icon: "📧",
      action: () => {
        onClose();
        window.location.href = "mailto:contact@tranvanphu.dev";
      },
    },
    {
      id: "social-github",
      title: t('command.viewGithub'),
      category: t('command.socials'),
      icon: "💻",
      action: () => {
        onClose();
        window.open("https://github.com/tranvanphu", "_blank");
      },
    },
    {
      id: "social-linkedin",
      title: t('command.connectLinkedin'),
      category: t('command.socials'),
      icon: "🤝",
      action: () => {
        onClose();
        window.open("https://linkedin.com/in/tranvanphu", "_blank");
      },
    },
  ];

  // Filter commands based on search
  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="command-palette-overlay">
      <div className="command-palette-container" ref={containerRef}>
        <div className="command-palette-search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="command-palette-input"
            placeholder={t('command.placeholder')}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className="esc-hint" onClick={onClose}>ESC</span>
        </div>

        <div className="command-palette-results">
          {filteredCommands.length === 0 ? (
            <div className="command-palette-empty">{t('command.noResults')} "{search}"</div>
          ) : (
            // Group by category
            Object.entries(
              filteredCommands.reduce((acc, cmd) => {
                if (!acc[cmd.category]) acc[cmd.category] = [];
                acc[cmd.category].push(cmd);
                return acc;
              }, {} as Record<string, CommandItem[]>)
            ).map(([category, items]) => (
              <div key={category} className="command-group">
                <div className="command-group-header">{category}</div>
                <div className="command-group-items">
                  {items.map((cmd) => {
                    // Calculate index in filtered list
                    const globalIndex = filteredCommands.findIndex((c) => c.id === cmd.id);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <div
                        key={cmd.id}
                        className={`command-item ${isSelected ? "selected" : ""}`}
                        onClick={() => cmd.action()}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                      >
                        <div className="command-item-left">
                          <span className="command-item-icon">{cmd.icon}</span>
                          <span className="command-item-title">{cmd.title}</span>
                        </div>
                        {cmd.shortcut && (
                          <span className="command-item-shortcut">{cmd.shortcut}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="command-palette-footer">
          <span className="footer-hint">
            <kbd>↑↓</kbd> {t('command.navigate')}
          </span>
          <span className="footer-hint">
            <kbd>↵</kbd> {t('command.select')}
          </span>
          <span className="footer-hint">
            <kbd>esc</kbd> {t('command.close')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
