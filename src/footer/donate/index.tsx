import { Button, Container } from "@allaround/all-components";

import { PAYPAL_BUTTON_URL } from "../../constants";
import LocalIcons from "../../icons";
import styles from "./Donate.module.css";

const Donate = () => {
  const handleDonate = () => {
    const url = PAYPAL_BUTTON_URL;
    window.open(url, "_blank");
  };

  return (
    <Container className={styles.container} noGrid>
      If you like this project and want to support it, you can donate here:
      <Button onClick={handleDonate} icon={<LocalIcons.Newtab />}>
        Donate
      </Button>
      Thank you very much.
    </Container>
  );
};

export default Donate;
