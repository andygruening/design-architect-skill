import { StrictMode, useMemo, useState, type CSSProperties } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type ThemeOption = {
  id: string;
  name: string;
  description: string;
  fontLabel: string;
  fontFamily: string;
  tokens: {
    page: string;
    surface: string;
    raised: string;
    header: string;
    headerBorder: string;
    footer: string;
    text: string;
    mutedText: string;
    subtleText: string;
    border: string;
    accent: string;
    primaryButton: string;
    primaryButtonText: string;
    secondaryButton: string;
    secondaryButtonText: string;
    dangerButton: string;
    dangerButtonText: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    labelText: string;
  };
};

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "dark",
    name: "Dark",
    description:
      "Black page backgrounds, translucent #ffffff17 component surfaces, white-on-color labels, and Roboto typography.",
    fontLabel: "Roboto",
    fontFamily: '"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    tokens: {
      page: "#000000",
      surface: "#ffffff17",
      raised: "#ffffff17",
      header: "#000000",
      headerBorder: "#ffffff17",
      footer: "#000000",
      text: "#F9FAFB",
      mutedText: "#D1D5DB",
      subtleText: "#6B7280",
      border: "transparent",
      accent: "#ffffff17",
      primaryButton: "#FFFFFF",
      primaryButtonText: "#000000",
      secondaryButton: "#ffffff17",
      secondaryButtonText: "#F9FAFB",
      dangerButton: "#EF4444",
      dangerButtonText: "#FFFFFF",
      success: "#059669",
      warning: "#D97706",
      danger: "#DC2626",
      info: "#4B5563",
      labelText: "#FFFFFF",
    },
  },
  {
    id: "light",
    name: "Light",
    description:
      "White page backgrounds, light gray accents, Roboto typography, and filled gray secondary controls.",
    fontLabel: "Roboto",
    fontFamily: '"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    tokens: {
      page: "#FFFFFF",
      surface: "#FFFFFF",
      raised: "#F3F4F6",
      header: "#FFFFFF",
      headerBorder: "#E5E7EB",
      footer: "#FFFFFF",
      text: "#111827",
      mutedText: "#4B5563",
      subtleText: "#9CA3AF",
      border: "#D1D5DB",
      accent: "#E5E7EB",
      primaryButton: "#111827",
      primaryButtonText: "#FFFFFF",
      secondaryButton: "#F3F4F6",
      secondaryButtonText: "#111827",
      dangerButton: "#DC2626",
      dangerButtonText: "#FFFFFF",
      success: "#047857",
      warning: "#B45309",
      danger: "#B91C1C",
      info: "#6B7280",
      labelText: "#FFFFFF",
    },
  },
  {
    id: "oms",
    name: "Polygon Labs' Open Money Stack",
    description:
      "White surfaces, slate neutrals, Fustat typography, sparse purple accents, and precise financial product copy.",
    fontLabel: "Fustat",
    fontFamily: '"Fustat", "Avenir Next", "Trebuchet MS", system-ui, sans-serif',
    tokens: {
      page: "#F6F6FC",
      surface: "#FFFFFF",
      raised: "#FFFFFF",
      header: "#FFFFFF",
      headerBorder: "#DFE3F0",
      footer: "#FFFFFF",
      text: "#141635",
      mutedText: "#64708F",
      subtleText: "#929EBA",
      border: "#C8CFE1",
      accent: "#670DE5",
      primaryButton: "#090624",
      primaryButtonText: "#FFFFFF",
      secondaryButton: "#FFFFFF",
      secondaryButtonText: "#090624",
      dangerButton: "#DC2626",
      dangerButtonText: "#FFFFFF",
      success: "#047857",
      warning: "#B45309",
      danger: "#B91C1C",
      info: "#670DE5",
      labelText: "#FFFFFF",
    },
  },
];

function App() {
  const [selectedId, setSelectedId] = useState(THEME_OPTIONS[0].id);
  const activeTheme = useMemo(
    () => THEME_OPTIONS.find((option) => option.id === selectedId) ?? THEME_OPTIONS[0],
    [selectedId],
  );

  return (
    <main className="app" style={themeVars(activeTheme)}>
      <header className="top-header">
        <div>
          <p className="eyebrow">Design system preview</p>
          <h1>Theme options</h1>
        </div>
        <label className="selector">
          <span>Theme</span>
          <select
            value={selectedId}
            onChange={(event: { target: { value: string } }) => setSelectedId(event.target.value)}
          >
            {THEME_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Active spec</p>
          <h2>{activeTheme.name}</h2>
          <p>{activeTheme.description}</p>
          <div className="font-sample" aria-label="Active typography">
            <span>Font</span>
            <strong>{activeTheme.fontLabel}</strong>
            <p>Money movement should feel precise, quiet, and repeatable.</p>
          </div>
        </div>
        <div className="token-grid" aria-label="Theme tokens">
          <TokenSwatch label="Page" value={activeTheme.tokens.page} />
          <TokenSwatch label="Surface" value={activeTheme.tokens.surface} />
          <TokenSwatch label="Accent" value={activeTheme.tokens.accent} />
          <TokenSwatch label="Primary" value={activeTheme.tokens.primaryButton} />
        </div>
      </section>

      <section className="layout">
        <div className="panel controls-panel">
          <div className="section-title">
            <p className="eyebrow">Controls</p>
            <h3>Buttons and fields</h3>
          </div>
          <div className="button-row">
            <button className="button primary-button">Create address</button>
            <button className="button secondary-button">Documentation</button>
            <button className="button danger-button">Cancel transfer</button>
          </div>
          <div className="field-grid">
            <label className="field">
              <span>Account name</span>
              <input value="Treasury operations" readOnly />
            </label>
            <label className="field">
              <span>Network</span>
              <select defaultValue="Polygon">
                <option>Polygon</option>
                <option>Ethereum</option>
                <option>Base</option>
              </select>
            </label>
          </div>
        </div>

        <div className="panel">
          <div className="section-title">
            <p className="eyebrow">Status</p>
            <h3>Labels and alerts</h3>
          </div>
          <div className="label-row">
            <span className="label info-label">Info</span>
            <span className="label success-label">Ready</span>
            <span className="label warning-label">Review</span>
            <span className="label danger-label">Blocked</span>
          </div>
          <div className="alert">
            <strong>Transfer policy updated</strong>
            <span>New approvals apply to transactions above $25,000.00.</span>
          </div>
        </div>
      </section>

      <section className="table-panel panel">
        <div className="section-title">
          <p className="eyebrow">Data surface</p>
          <h3>Recent activity</h3>
        </div>
        <div className="rows" role="table" aria-label="Recent activity">
          {[
            ["USDC deposit", "$18,240.00", "Ready"],
            ["Vendor payout", "$4,800.00", "Review"],
            ["Address check", "0x7a...91e4", "Info"],
          ].map(([name, value, state]) => (
            <div className="data-row" role="row" key={name}>
              <span>{name}</span>
              <span>{value}</span>
              <span>{state}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>{activeTheme.name}</span>
        <span>Generated preview</span>
      </footer>
    </main>
  );
}

function TokenSwatch({ label, value }: { label: string; value: string }) {
  return (
    <div className="token">
      <span className="swatch" style={{ background: value }} />
      <span>{label}</span>
      <code>{value}</code>
    </div>
  );
}

function themeVars(theme: ThemeOption) {
  return {
    "--font-family": theme.fontFamily,
    "--font-label": `"${theme.fontLabel}"`,
    "--page": theme.tokens.page,
    "--surface": theme.tokens.surface,
    "--raised": theme.tokens.raised,
    "--header": theme.tokens.header,
    "--header-border": theme.tokens.headerBorder,
    "--footer": theme.tokens.footer,
    "--text": theme.tokens.text,
    "--muted-text": theme.tokens.mutedText,
    "--subtle-text": theme.tokens.subtleText,
    "--border": theme.tokens.border,
    "--accent": theme.tokens.accent,
    "--primary-button": theme.tokens.primaryButton,
    "--primary-button-text": theme.tokens.primaryButtonText,
    "--secondary-button": theme.tokens.secondaryButton,
    "--secondary-button-text": theme.tokens.secondaryButtonText,
    "--danger-button": theme.tokens.dangerButton,
    "--danger-button-text": theme.tokens.dangerButtonText,
    "--success": theme.tokens.success,
    "--warning": theme.tokens.warning,
    "--danger": theme.tokens.danger,
    "--info": theme.tokens.info,
    "--label-text": theme.tokens.labelText,
  } as CSSProperties;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
