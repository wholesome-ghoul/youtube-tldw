import { Container, Heading } from "@allaround/all-components";

import styles from "./Answer.module.css";

type Props = {
  answer: string;
};

const Answer = ({ answer }: Props) => {
  const [tldr, longAnswer] = answer.split("===DELIMITER===");

  return (
    <Container className={styles.container} noGrid>
      <Container className={styles.tldrContainer} noGrid>
        <Heading.h5 className={styles.heading}>TL;DR</Heading.h5>
        <Container className={styles.tldr} noGrid>
          {tldr
            ?.trim()
            .replace(/^(Succinct answer:)/, "")
            .trim()}
        </Container>
      </Container>

      <Container className={styles.detailsContainer} noGrid>
        <Heading.h5 className={styles.heading}>Details</Heading.h5>
        <Container className={styles.detailedAnswer} noGrid>
          {longAnswer
            ?.trim()
            .replace(/^(Long answer:)/, "")
            .trim()}
        </Container>
      </Container>
    </Container>
  );
};

export default Answer;
