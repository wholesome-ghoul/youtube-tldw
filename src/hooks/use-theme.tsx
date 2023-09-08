import { hooks } from "@allaround/all-components";
import { useEffect } from "react";

import { $Theme } from "../types";

const { useLocalStorage } = hooks;

const useTheme: () => [
  $Theme,
  React.Dispatch<React.SetStateAction<$Theme>>
] = () => {
  const [theme, setTheme] = useLocalStorage<$Theme>(
    "youtube-tldw-theme",
    "dark"
  );
  const body = document.querySelector("[data-theme]");

  useEffect(() => {
    if (body) {
      body.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
