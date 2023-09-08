import { Container, Heading, List, Text } from "@allaround/all-components";

import styles from "./About.module.css";

const About = () => {
  return (
    <Container className={styles.container} noGrid flex>
      <Container noGrid>
        <Heading.h4 className={styles.heading}>TL;DR</Heading.h4>
        <List
          bulletPosition="outside"
          items={[
            "It's all about saving time.",
            "Often videos have too many ads, and I don't know what to expect from the video (especially from unknown creators), so without wasting time I just want to know what the video is about (Key Points feature).",
            "Sometimes I don't want to watch the whole video, and want to know the answer to the intriguing question in the title (Title Answer feature).",
            "Generate once, use forever (no subscription, no ads, no tracking, no data collection, no analytics). Or don't, and if someone else will, you can still use it for free.",
          ]}
        />
      </Container>

      <Container noGrid>
        <Heading.h4 className={styles.heading}>More details:</Heading.h4>

        <Text className={styles.text}>
          Hello, I am Ghoul, a software engineer and yes my design sucks.
        </Text>
        <Container className={styles.text} noGrid>
          There are multiple reasons why I made this app:
          <List
            className={styles.list}
            bulletPosition="outside"
            items={[
              "To have a project so more recruiters notice me",
              "To make something useful and use it myself as well",
              "And of course earn extra money",
            ]}
          />
        </Container>
        <Text className={styles.text}>
          If my app proves beneficial to a wider audience, I plan to improve it.
          My ideas include making it a Progressive Web app for mobile
          accessibility, requesting an increased API quota from Youtube for
          processing more videos, refining existing features, introducing new
          ones, and optimizing infrastructure, among other improvements.
        </Text>
        <Text className={styles.text}>
          I'm also considering content creators. Personally, I greatly
          appreciate it when creators include timestamps in their videos, and I
          respect that very much. Timestamps are a tremendous time-saver when
          you're searching for specific content. In fact, I often end up
          watching the entire video because the overall quality is excellent.
        </Text>
        <Text>
          However, certain creators don't follow this practice, and to make
          matters worse, the answer is buried somewhere within the video.
          Consequently, you end up watching the entire video. And on top of that
          videos often start with multiple unskippable ads and/or Youtube
          frequently interrupts with ads every five minutes. While solutions
          like Youtube Premium or adblockers are available, none of them address
          the issue of "hidden content", so hopefully Youtube TL;DW will help
          with that.
        </Text>
      </Container>
    </Container>
  );
};
export default About;
