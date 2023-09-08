import { Button, Icons } from "@allaround/all-components";
import { useContext } from "react";

import Context from "../context";

const ThemeToggler = () => {
  const { theme, setTheme } = useContext(Context.ThemeContext);

  return (
    <Button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      icon={
        theme === "dark" ? (
          <Icons.SunIcon size="medium" />
        ) : (
          <Icons.MoonIcon size="medium" />
        )
      }
      styles={{ justifySelf: "end" }}
      noBorder
      transparent
    />
  );
};

export default ThemeToggler;
