import { Button, Container, Navbar } from "@allaround/all-components";
import cx from "classnames";
import { useState } from "react";

import About from "./about";
import Socials from "./socials";
import Donate from "./donate";
import Hire from "./hire";
import Feedback from "./feedback";
import styles from "./Footer.module.css";

type $Page = "about" | "socials" | "donate" | "hire" | "feedback";

type $PageMapper = Record<$Page, JSX.Element>;

const pageMapper: $PageMapper = {
  about: <About />,
  socials: <Socials />,
  donate: <Donate />,
  hire: <Hire />,
  feedback: <Feedback />,
};

const Footer = () => {
  const [selected, setSelected] = useState<$Page>("about");

  return (
    <Container className={styles.container} noGrid flex>
      <Navbar
        grid={{
          rows: 1,
          cols: 5,
        }}
      >
        <Button
          onClick={() => setSelected("about")}
          className={cx(styles.button, {
            [styles.selectedButton]: selected === "about",
          })}
          noBorder
          transparent
        >
          About
        </Button>
        <Button
          onClick={() => setSelected("socials")}
          className={cx(styles.button, {
            [styles.selectedButton]: selected === "socials",
          })}
          noBorder
          transparent
        >
          Socials
        </Button>
        <Button
          onClick={() => setSelected("donate")}
          className={cx(styles.button, {
            [styles.selectedButton]: selected === "donate",
          })}
          noBorder
          transparent
        >
          Donate
        </Button>
        <Button
          onClick={() => setSelected("hire")}
          className={cx(styles.button, {
            [styles.selectedButton]: selected === "hire",
          })}
          noBorder
          transparent
        >
          Hire Me
        </Button>
        <Button
          onClick={() => setSelected("feedback")}
          className={cx(styles.button, {
            [styles.selectedButton]: selected === "feedback",
          })}
          noBorder
          transparent
        >
          Feedback
        </Button>
      </Navbar>

      <Container styles={{ width: "70%" }} noGrid>
        {pageMapper[selected]}
      </Container>
    </Container>
  );
};

export default Footer;
