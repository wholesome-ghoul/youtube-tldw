import { useContext, useRef } from "react";
import { Container, Tooltip } from "@allaround/all-components";

import Context from "../context";
import LocalIcons from "../icons";

import styles from "./index.module.css";

const CreditsAvailable = () => {
  const { customerInfo } = useContext(Context.CustomerContext);
  const creditsRemaining = customerInfo?.creditsRemaining ?? 0;
  const creditsPending = customerInfo?.creditsPending ?? 0;
  const creditsPendingContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Container className={styles.text} noGrid flex>
      Credits Available:
      <LocalIcons.Credits
        className={styles.creditsIcon}
        width={20}
        height={20}
      />
      <Container className={styles.creditsRemaining} noGrid>
        {creditsRemaining}
      </Container>
      <Container
        className={styles.creditsPending}
        innerRef={creditsPendingContainerRef}
        noGrid
      >
        ({creditsPending === 0 ? 0 : -creditsPending})
      </Container>
      <Tooltip componentRef={creditsPendingContainerRef}>
        Pending credits
      </Tooltip>
    </Container>
  );
};

export default CreditsAvailable;
