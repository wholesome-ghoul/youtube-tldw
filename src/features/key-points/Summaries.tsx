import { Button, Container, Heading, Icons } from "@allaround/all-components";
import cx from "classnames";
import { useMemo, useState } from "react";
import { secondsToMinutes } from "../../helpers";

import LocalIcons from "../../icons";
import { $VideoInfo } from "../../types";
import styles from "./Summaries.module.css";

type Props = {
  videoInfo: $VideoInfo;
  keyPointsVideoTimestampHandler: (timestamp: number) => void;
  youtubeVideoTimestampHandler: (timestamp: number) => void;
};

const Summaries = ({
  videoInfo,
  keyPointsVideoTimestampHandler,
  youtubeVideoTimestampHandler,
}: Props) => {
  const [videoType, setVideoType] = useState<"youtube" | "keyPoints">(
    "youtube"
  );
  const videoTimestampMapper = useMemo(
    () => ({
      youtube: youtubeVideoTimestampHandler,
      keyPoints: keyPointsVideoTimestampHandler,
    }),
    [youtubeVideoTimestampHandler, keyPointsVideoTimestampHandler]
  );

  let rangeStart,
    rangeEnd: number = 0;

  const toggleVideoType = () => {
    if (videoType === "youtube") {
      setVideoType("keyPoints");
    } else {
      setVideoType("youtube");
    }
  };

  const jumpToTimestamp = (timestamp: number) => {
    videoTimestampMapper[videoType](timestamp);
  };

  return (
    <Container className={styles.container} noGrid flex>
      <Container className={cx(styles.row)} noGrid flex>
        <Container className={styles.headingContainer} noGrid>
          <Button
            onClick={toggleVideoType}
            icon={
              videoType === "keyPoints" ? (
                <LocalIcons.KP
                  className={styles.icon}
                  fill="white"
                  width="36px"
                  height="36px"
                />
              ) : (
                <Icons.YoutubeIcon
                  className={styles.icon}
                  fill="red"
                  width="36px"
                  height="36px"
                />
              )
            }
            className={styles.timestampsButton}
            transparent
            hoverTransparent
          >
            Timestamps
          </Button>
        </Container>
        <Container className={styles.headingContainer} noGrid>
          <Heading.h5>Summary</Heading.h5>
        </Container>
      </Container>

      {videoInfo?.keyPoints?.transcript?.map((item, index) => {
        rangeStart = rangeEnd;
        rangeEnd = rangeStart + (item.end - item.start);

        const start = videoType === "youtube" ? item.start : rangeStart;
        const end = videoType === "youtube" ? item.end : rangeEnd;

        return (
          <Container className={cx(styles.row)} noGrid flex key={index}>
            <Container noGrid>
              <Button
                onClick={() => jumpToTimestamp(start)}
                className={styles.timestamp}
              >
                {secondsToMinutes(start)}
              </Button>
              -
              <Button
                onClick={() => jumpToTimestamp(end)}
                className={styles.timestamp}
              >
                {secondsToMinutes(end)}
              </Button>
            </Container>
            <Container className={styles.summary} noGrid>
              {item.summary.replace(/\\'s/g, "'s")}
            </Container>
          </Container>
        );
      })}
    </Container>
  );
};

export default Summaries;
