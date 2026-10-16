"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { effectiveTheme, setTheme, useThemePref, type ThemePref } from "@/lib/theme";

/** Header button: switches between light and dark. The icon shows the mode you would switch to. */
export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={() => setTheme(effectiveTheme() === "dark" ? "light" : "dark")}
      aria-label="Switch between light and dark mode"
      title="Switch between light and dark mode"
      className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink transition-colors hover:border-ink"
    >
      <Moon className="show-in-light h-5 w-5" aria-hidden="true" />
      <Sun className="show-in-dark h-5 w-5" aria-hidden="true" />
    </button>
  );
}

const options: { id: ThemePref; label: string; Icon: typeof Sun }[] = [
  { id: "light", label: "Light", Icon: Sun },
  { id: "dark", label: "Dark", Icon: Moon },
  { id: "system", label: "Device", Icon: Monitor },
];

/** Footer control: Light, Dark, or follow the device (the default). */
export function ThemeSwitch() {
  const pref = useThemePref();
  return (
    <div role="radiogroup" aria-label="Colour theme" className="inline-flex rounded-md border border-white/25 p-1">
      {options.map(({ id, label, Icon }) => {
        const active = pref === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(id)}
            className={`inline-flex min-h-9 items-center gap-1.5 rounded px-3 text-sm font-medium transition-colors ${
              active ? "bg-white text-[#163024]" : "text-white/75 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
