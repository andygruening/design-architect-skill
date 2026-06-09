import { createContext, useContext, useMemo, useState, type CSSProperties } from "react";
import * as darkTheme from "./dark.gen";
import * as lightTheme from "./light.gen";
import * as omsTheme from "./oms.gen";

type StyleRecipe = Record<string, string | number>;

type GeneratedThemeModule = {
  readonly designTheme: {
    readonly id: string;
    readonly name: string;
    readonly description: string;
  };
  readonly designTokens: {
    readonly colors: {
      readonly page: string;
      readonly surface: string;
      readonly secondarySurface: string;
      readonly header: string;
      readonly headerBorder: string;
      readonly footer: string;
      readonly primaryText: string;
      readonly secondaryText: string;
      readonly placeholderText: string;
      readonly border: string;
      readonly brand: string;
      readonly primaryButton: string;
      readonly primaryButtonText: string;
      readonly secondaryButton: string;
      readonly secondaryButtonText: string;
      readonly danger: string;
      readonly success: string;
      readonly warning: string;
      readonly info: string;
    };
    readonly typography: {
      readonly fontFamily: string;
    };
    readonly borders: {
      readonly defaultWidth: string;
    };
  };
  readonly buttonRecipe: {
    readonly primary: StyleRecipe;
    readonly secondary: StyleRecipe;
    readonly dangerPrimary: StyleRecipe;
  };
  readonly componentRecipe: {
    readonly card: StyleRecipe;
    readonly input: StyleRecipe;
    readonly header: StyleRecipe;
  };
};

export type ThemeOption = {
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
    borderWidth: string;
    cardBorder: string;
    inputBorder: string;
    headerBorderStyle: string;
  };
};

type ThemeContextValue = {
  themeOptions: ThemeOption[];
  selectedThemeId: string;
  setSelectedThemeId: (themeId: string) => void;
  activeTheme: ThemeOption;
  themeVars: CSSProperties;
};

export const themeOptions: ThemeOption[] = [darkTheme, lightTheme, omsTheme].map(toThemeOption);

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: any }) {
  const [selectedThemeId, setSelectedThemeId] = useState(themeOptions[2].id);
  const activeTheme = useMemo(
    () => themeOptions.find((option) => option.id === selectedThemeId) ?? themeOptions[2],
    [selectedThemeId],
  );
  const value = useMemo(
    () => ({
      themeOptions,
      selectedThemeId,
      setSelectedThemeId,
      activeTheme,
      themeVars: getThemeVars(activeTheme),
    }),
    [activeTheme, selectedThemeId],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

function toThemeOption(themeModule: GeneratedThemeModule): ThemeOption {
  const { buttonRecipe, componentRecipe, designTheme, designTokens } = themeModule;
  const { colors } = designTokens;

  return {
    id: designTheme.id,
    name: designTheme.name,
    description: designTheme.description,
    fontLabel: designTokens.typography.fontFamily,
    fontFamily: fontStack(designTokens.typography.fontFamily),
    tokens: {
      page: colors.page,
      surface: colors.surface,
      raised: colors.secondarySurface,
      header: colors.header,
      headerBorder: colors.headerBorder,
      footer: colors.footer,
      text: colors.primaryText,
      mutedText: colors.secondaryText,
      subtleText: colors.placeholderText,
      border: colors.border,
      accent: colors.brand,
      primaryButton: stringValue(buttonRecipe.primary.background),
      primaryButtonText: stringValue(buttonRecipe.primary.color),
      secondaryButton: stringValue(buttonRecipe.secondary.background),
      secondaryButtonText: stringValue(buttonRecipe.secondary.color),
      dangerButton: stringValue(buttonRecipe.dangerPrimary.background),
      dangerButtonText: stringValue(buttonRecipe.dangerPrimary.color),
      success: colors.success,
      warning: colors.warning,
      danger: colors.danger,
      info: colors.info,
      labelText: "#FFFFFF",
      borderWidth: designTokens.borders.defaultWidth,
      cardBorder: stringValue(componentRecipe.card.border),
      inputBorder: stringValue(componentRecipe.input.border),
      headerBorderStyle: stringValue(componentRecipe.header.borderBottom),
    },
  };
}

function fontStack(fontFamily: string) {
  if (fontFamily === "Fustat") {
    return '"Fustat", "Avenir Next", "Trebuchet MS", system-ui, sans-serif';
  }
  if (fontFamily === "Roboto") {
    return '"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  }
  return 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
}

function stringValue(value: string | number) {
  return String(value);
}

function getThemeVars(theme: ThemeOption) {
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
    "--border-width": theme.tokens.borderWidth,
    "--card-border": theme.tokens.cardBorder,
    "--input-border": theme.tokens.inputBorder,
    "--header-border-style": theme.tokens.headerBorderStyle,
  } as CSSProperties;
}
