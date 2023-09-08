import { Button, Container, Icons } from "@allaround/all-components";
import { socials } from "../../constants";

import LocalIcons from "../../icons";
import styles from "./Feedback.module.css";

const contactMapper: { [key: string]: string } = {
  featureRequest: `${socials.mail}?subject=Youtube TL;DW Feature Request`,
  feedback: `${socials.mail}?subject=Youtube TL;DW Feedback`,
  discord: socials.discord,
};

const Feedback = () => {
  const handleClick = (type: string) => {
    window.open(contactMapper[type], "_blank");
  };

  return (
    <Container className={styles.container} noGrid>
      If you'd like to give me feedback or request a feature, you can contact me
      here:
      <Button
        onClick={() => handleClick("feedback")}
        icon={<LocalIcons.Newtab />}
        noBorder
      >
        Feedback
      </Button>
      <Button
        onClick={() => handleClick("featureRequest")}
        icon={<LocalIcons.Newtab />}
        noBorder
      >
        Feature Request
      </Button>
      Or you can join the discord server:
      <Button
        onClick={() => handleClick("discord")}
        icon={<Icons.DiscordIcon size="large" fill="#7289da" />}
        noBorder
      />
    </Container>
  );
};

export default Feedback;
