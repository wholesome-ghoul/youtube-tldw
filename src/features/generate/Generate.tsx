import { Button, Container, Text } from "@allaround/all-components";
import isNil from "lodash.isnil";
import { useContext, useEffect } from "react";

import { featureDisplayNames, SERVER_URL } from "../../constants";
import Context from "../../context";
import { use } from "../../helpers";
import { $FEATURE_NAME } from "../../types";

type Props = {
  cb: () => void;
  featureName: $FEATURE_NAME;
};

const featureToEndpointMapper = {
  titleAnswer: "calculate-ta-cost",
  keyPoints: "calculate-tldr-cost",
};

let cache = new Map();

function fetchData(videoInfo: any, featureName: $FEATURE_NAME) {
  if (!cache.has(featureName + videoInfo?.videoID)) {
    cache.set(
      featureName + videoInfo?.videoID,
      getData(videoInfo, featureName)
    );
  }

  return cache.get(featureName + videoInfo?.videoID);
}

async function getData(videoInfo: any, featureName: $FEATURE_NAME) {
  return await getCreditsNeeded(videoInfo, featureName);
}

async function getCreditsNeeded(videoInfo: any, featureName: $FEATURE_NAME) {
  try {
    if (videoInfo?.[featureName]?.creditsNeeded) {
      return await new Promise((resolve) =>
        resolve(videoInfo?.[featureName]?.creditsNeeded)
      );
    }

    const response = await fetch(
      `${SERVER_URL}/api/${featureToEndpointMapper[featureName]}?videoID=${
        videoInfo?.videoID ?? ""
      }`
    );

    const data = await response.json();
    return data.creditsNeeded ?? 0;
  } catch (e) {
    return 0;
  }
}

const Generate = ({ cb, featureName }: Props) => {
  const { videoInfo, setVideoInfo } = useContext(Context.VideoContext);
  const creditsNeeded = use(fetchData(videoInfo, featureName));

  useEffect(() => {
    if (isNil(creditsNeeded)) return;

    setVideoInfo((prevVideoInfo) => ({
      ...prevVideoInfo,
      [featureName]: {
        ...videoInfo?.[featureName],
        creditsNeeded,
      },
    }));
  }, [creditsNeeded]);

  return (
    <Container styles={{ flexDirection: "column" }} gap="20px" noGrid flex>
      <Button onClick={cb} fill>
        Generate {featureDisplayNames[featureName]} for {creditsNeeded} credits
      </Button>

      <Container noGrid>
        <Text>
          * As soon as I will have enough money to pay for the server, I will
          upgrade infrastructure and increase the number of enabled requests.
          Thank you for your patience.
        </Text>
        <Text>
          * Please, do not clear your cookies and local storage. You may lose
          all credits.
        </Text>
      </Container>
    </Container>
  );
};

export default Generate;
