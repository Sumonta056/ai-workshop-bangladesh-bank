"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { App, ConfigProvider, theme as antTheme } from "antd";

type ThemeMode = "light" | "dark";

const ThemeContext = createContext<{
  mode: ThemeMode;
  toggle: () => void;
}>({ mode: "light", toggle: () => {} });

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as ThemeMode | null;
    if (saved) setMode(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <ConfigProvider
        theme={{
          algorithm: mode === "dark" ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
          token: {
            colorPrimary: "#1677ff",
            borderRadius: 8,
          },
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
