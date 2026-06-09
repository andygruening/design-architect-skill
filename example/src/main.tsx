import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { CodexMarketplaceApp } from "./generated/pages/marketplace/codex/main";
import { WebMarketplaceApp } from "./generated/pages/marketplace/web/main";
import { ThemeProvider, useTheme } from "./generated/themes/ThemeContext";
import "./styles.css";

const designOptions = ["Codex", "Web"] as const;

function App() {
  const { selectedThemeId, setSelectedThemeId, themeOptions, themeVars } = useTheme();
  const [selectedDesign, setSelectedDesign] = useState<(typeof designOptions)[number]>("Web");

  return (
    <main className="app" style={themeVars}>
      <header className="top-header">
        <div className="header-inner">
          <a className="brand">
            Design Architect
          </a>
          <div className="selector-row">
            <label className="selector">
              <span>Theme</span>
              <select
                value={selectedThemeId}
                onChange={(event: { target: { value: string } }) => setSelectedThemeId(event.target.value)}
              >
                {themeOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="selector">
              <span>Design</span>
              <select
                value={selectedDesign}
                onChange={(event: { target: { value: (typeof designOptions)[number] } }) =>
                  setSelectedDesign(event.target.value)
                }
              >
                {designOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </header>

      {selectedDesign === "Web" ? <WebMarketplaceApp /> : <CodexMarketplaceApp />}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
