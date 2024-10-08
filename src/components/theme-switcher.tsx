import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useTheme } from "next-themes";
import React from "react";

export const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { setTheme, resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  const handleToggle = () => {
    if (isDarkMode) {
      setTheme("light");
      return;
    }
    setTheme("dark");
  };

  return (
    <div
      className={`flex space-x-2 h-8 items-center justify-center text-sm ${className}`}
    >
      <input
        id="theme-toggle"
        type="checkbox"
        className="toggle toggle-primary bg-primary hover:bg-primary border-primary"
        onChange={handleToggle}
        checked={isDarkMode}
      />
      <label
        htmlFor="theme-toggle"
        className={`swap swap-rotate ${!isDarkMode ? "swap-active" : ""}`}
      >
        <SunIcon className="swap-on h-5 w-5" />
        <MoonIcon className="swap-off h-5 w-5" />
      </label>
    </div>
  );
};
