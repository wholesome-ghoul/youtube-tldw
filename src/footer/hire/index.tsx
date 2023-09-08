import { Button, Container, Icons } from "@allaround/all-components";
import { useContext } from "react";

import Context from "../../context";
import styles from "./Hire.module.css";

const Hire = () => {
  const { theme } = useContext(Context.ThemeContext);

  return (
    <Container className={styles.container} noGrid>
      If you'd like to hire me, you can contact me here:
      <Button
        onClick={() =>
          window.open("mailto:wholesome.ghoul@gmail.com", "_blank")
        }
        icon={
          <Icons.MailIcon
            size="large"
            fill={theme === "dark" ? "#fff" : "#000"}
          />
        }
        tooltip={{
          children: "mailto:wholesome.ghoul@gmail.com",
          preferredPosition: "top",
        }}
        noBorder
      />
    </Container>
  );
};

export default Hire;
