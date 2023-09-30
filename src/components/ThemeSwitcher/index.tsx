import { useEffect, useState } from "react";

import { BsMoonStars } from "react-icons/bs";
import { PiSunHorizon } from "react-icons/pi";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div>
      <button
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
        tabIndex={1}
        title="Alterar tema"
        aria-label="Alterar tema"
      >
        {theme === "dark" ? (
          <BsMoonStars size={20} className=" text-[#F2C138] " />
        ) : (
          <PiSunHorizon size={22} className=" text-[#6bbbcf] " />
        )}
      </button>
    </div>
  );
};
