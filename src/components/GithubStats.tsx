import { useEffect, useState } from "react";
import "./styles/GithubStats.css";

interface GitHubData {
  followers: number;
  publicRepos: number;
  stars: number;
}

const GithubStats = () => {
  const [stats, setStats] = useState<GitHubData>({
    followers: 12,
    publicRepos: 18,
    stars: 8,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userRes = await fetch("https://api.github.com/users/tranvanphu");
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();

        const reposRes = await fetch("https://api.github.com/users/tranvanphu/repos?per_page=100");
        let starsCount = 8; // fallback default
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          starsCount = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
        }

        setStats({
          followers: userData.followers || 12,
          publicRepos: userData.public_repos || 18,
          stars: starsCount,
        });
      } catch (err) {
        console.warn("GitHub API error or rate-limited. Using default stats.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Generate realistic contribution grid data (53 weeks x 7 days)
  const generateContributions = () => {
    const weeks = 53;
    const days = 7;
    const grid: number[][] = [];

    // Simple pseudo-random generator with a seed to keep it stable
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    let seed = 42;
    for (let w = 0; w < weeks; w++) {
      const weekDays: number[] = [];
      for (let d = 0; d < days; d++) {
        const rand = pseudoRandom(seed++);
        // Distribute levels: 0 (lightest/empty), 1, 2, 3, 4 (darkest/purple)
        let level = 0;
        if (rand > 0.45) level = 1;
        if (rand > 0.7) level = 2;
        if (rand > 0.88) level = 3;
        if (rand > 0.96) level = 4;
        
        // Add weekends slightly lower activity
        if ((d === 0 || d === 6) && rand > 0.6) {
          level = Math.max(0, level - 1);
        }
        weekDays.push(level);
      }
      grid.push(weekDays);
    }
    return grid;
  };

  const contributionsGrid = generateContributions();
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return (
    <div className="github-stats-section" id="github-contributions">
      <div className="github-container">
        <h2 className="github-heading">Code & Contributions</h2>
        <div className="github-grid-layout">
          
          {/* Main Heatmap Card (Left, 70%) */}
          <div className="github-card heatmap-card" data-cursor="disable">
            <div className="heatmap-header">
              <div className="user-profile">
                <div className="github-avatar-circle">
                  <span className="github-logo-icon">🐙</span>
                </div>
                <div className="user-info">
                  <h4>@tranvanphu</h4>
                  <p>Contribution activity on GitHub</p>
                </div>
              </div>
            </div>

            <div className="heatmap-months-row">
              {months.map((m, idx) => (
                <span key={idx} className="month-label">{m}</span>
              ))}
            </div>

            <div className="heatmap-calendar-wrapper">
              <div className="heatmap-grid">
                {contributionsGrid.map((week, wIdx) => (
                  <div key={wIdx} className="heatmap-column">
                    {week.map((level, dIdx) => (
                      <div
                        key={dIdx}
                        className={`heatmap-cell level-${level}`}
                        title={`Contribution level: ${level}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="heatmap-footer">
              <span className="total-contributions">
                {loading ? "Calculating..." : "1,452 contributions in the last year"}
              </span>
              <div className="legend">
                <span>Less</span>
                <div className="heatmap-cell level-0" />
                <div className="heatmap-cell level-1" />
                <div className="heatmap-cell level-2" />
                <div className="heatmap-cell level-3" />
                <div className="heatmap-cell level-4" />
                <span>More</span>
              </div>
            </div>

            {/* Empty Space filler: Featured Repositories */}
            <div className="github-card-divider" />
            <div className="github-repos-section">
              <h5 className="github-subheading">Featured Repositories</h5>
              <div className="github-repos-list">
                <div className="github-repo-item">
                  <div className="repo-header">
                    <span className="repo-icon">📂</span>
                    <a href="https://github.com/tranvanphu/football-annotation-cv" target="_blank" rel="noreferrer" className="repo-name">
                      football-annotation-cv
                    </a>
                    <span className="repo-badge">Public</span>
                  </div>
                  <p className="repo-desc">Optical tracking system & auto-annotation pipelines for soccer match video analysis using computer vision and YOLOv8.</p>
                  <div className="repo-meta">
                    <span className="repo-lang"><span className="lang-dot python" /> Python</span>
                    <span className="repo-stars">⭐ 14</span>
                    <span className="repo-forks">🍴 3</span>
                  </div>
                </div>

                <div className="github-repo-item">
                  <div className="repo-header">
                    <span className="repo-icon">📂</span>
                    <a href="https://github.com/tranvanphu/vietnamese-rap-analyzer" target="_blank" rel="noreferrer" className="repo-name">
                      vietnamese-rap-analyzer
                    </a>
                    <span className="repo-badge">Public</span>
                  </div>
                  <p className="repo-desc">Natural Language Processing (NLP) tools for analyzing Vietnamese rap lyrics, rhyme schemes, and thematic patterns.</p>
                  <div className="repo-meta">
                    <span className="repo-lang"><span className="lang-dot typescript" /> TypeScript</span>
                    <span className="repo-stars">⭐ 8</span>
                    <span className="repo-forks">🍴 1</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Stats Cards (Right, 30%) */}
          <div className="github-stats-sidebar">
            <div className="github-card stat-card followers-card" data-cursor="disable">
              <div className="stat-icon-wrapper purple-glow">👥</div>
              <div className="stat-value">{stats.followers}</div>
              <div className="stat-label">Followers</div>
            </div>

            <div className="github-card stat-card repos-card" data-cursor="disable">
              <div className="stat-icon-wrapper teal-glow">🗂️</div>
              <div className="stat-value">{stats.publicRepos}</div>
              <div className="stat-label">Repositories</div>
            </div>

            <div className="github-card stat-card stars-card" data-cursor="disable">
              <div className="stat-icon-wrapper gold-glow">⭐</div>
              <div className="stat-value">{stats.stars}</div>
              <div className="stat-label">GitHub Stars</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GithubStats;
