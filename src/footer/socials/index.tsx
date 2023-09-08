import { Button, Container, Icons } from "@allaround/all-components";
import { useContext } from "react";

import { socials } from "../../constants";
import Context from "../../context";
import styles from "./Socials.module.css";

type $SocialMapper = {
  [key: string]: {
    tooltip: string;
    url: string;
  };
};

const socialsMapper: $SocialMapper = {
  discord: {
    tooltip: "Discord",
    url: socials.discord,
  },
  github: {
    tooltip: "Github",
    url: socials.github,
  },
  mail: {
    tooltip: "Mail",
    url: socials.mail,
  },
};

const Socials = () => {
  const { theme } = useContext(Context.ThemeContext);

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Container className={styles.container} noGrid flex>
      <Button
        onClick={() => handleSocialClick(socialsMapper.github.url)}
        icon={
          <Icons.GithubIcon
            size="large"
            fill={theme === "dark" ? "#fff" : "#000"}
          />
        }
        tooltip={{
          children: socialsMapper.github.tooltip,
          preferredPosition: "top",
        }}
        noBorder
      />

      <Button
        onClick={() => handleSocialClick(socialsMapper.discord.url)}
        icon={<Icons.DiscordIcon size="large" fill="#7289da" />}
        tooltip={{
          children: socialsMapper.discord.tooltip,
          preferredPosition: "top",
        }}
        noBorder
      />

      <Button
        onClick={() => handleSocialClick(socialsMapper.mail.url)}
        icon={
          <Icons.MailIcon
            size="large"
            fill={theme === "dark" ? "#fff" : "#000"}
          />
        }
        tooltip={{
          children: socialsMapper.mail.tooltip,
          preferredPosition: "top",
        }}
        noBorder
      />
    </Container>
  );
};

export default Socials;
