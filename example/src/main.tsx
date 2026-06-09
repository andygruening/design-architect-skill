import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { designOptions } from "./generated/designs.gen";
import { CodexMarketplaceApp } from "./generated/pages/marketplace/codex/main";
import { WebMarketplaceApp } from "./generated/pages/marketplace/web/main";
import { ThemeProvider, useTheme } from "./generated/themes/ThemeContext";
import "./styles.css";

function App() {
  const { selectedThemeId, setSelectedThemeId, themeOptions, themeVars } = useTheme();
  const [selectedDesignId, setSelectedDesignId] = useState<string>(designOptions[1].id);
  const activeDesign = useMemo(
    () => designOptions.find((option) => option.id === selectedDesignId) ?? designOptions[1],
    [selectedDesignId],
  );

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
                value={selectedDesignId}
                onChange={(event: { target: { value: string } }) => setSelectedDesignId(event.target.value)}
              >
                {designOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </header>

      {activeDesign.id === "codex" && <CodexMarketplaceApp />}
      {activeDesign.id === "web" && <WebMarketplaceApp />}
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
