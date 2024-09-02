import { createContext, useState, useContext, ReactNode } from 'react';

interface ThemeContextType {
  theme: { color?: string; background?: string; font?: string };
  applyTheme: (newTheme: string, themeType: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<{
    color?: string;
    background?: string;
    font?: string;
  }>({
    color: `#FFFFFF`,
    background: `#2f2f2f`,
    font: `default`,
  });

  const applyTheme = (newTheme: string, themeType: string) => {
    if (themeType === `Background`) {
      setTheme({ background: newTheme });
    }
    if (themeType === `Color`) {
      setTheme({ color: newTheme });
    }
    if (themeType === `Font`) {
      setTheme({ font: newTheme });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(`useTheme must be used within a ThemeProvider`);
  }
  return context;
};
