import { useState, useEffect } from "react";
import {
  Container,
  Heading,
  hooks,
  Input,
  List,
} from "@allaround/all-components";
import isNil from "lodash.isnil";
import debounce from "lodash.debounce";

import Features from "./features";
import { KeyPoints, TitleAnswer } from "./features";
import Purchase from "./purchase";
import {
  $CustomerInfo,
  $FEATURE_NAME,
  $KeyPoints,
  $TitleAnswer,
  $VideoInfo,
} from "./types";
import { SERVER_URL } from "./constants";
import Context from "./context";
import { useTheme } from "./hooks";
import Navbar from "./navbar";
import Footer from "./footer";

const { useLocalStorage } = hooks;

const featureMapper = {
  keyPoints: KeyPoints,
  titleAnswer: TitleAnswer,
};

const SelectedFeature = ({
  selectedFeature,
}: {
  selectedFeature: $FEATURE_NAME;
}) => {
  const Feature = featureMapper[selectedFeature];
  return <Feature />;
};

const App = () => {
  const [selectedFeature, setSelectedFeature] =
    useState<$FEATURE_NAME>("keyPoints");
  const [customerInfo, setCustomerInfo] = useLocalStorage<$CustomerInfo | null>(
    "youtube-tldw-customer",
    null
  );
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [debouncedYoutubeUrl, setDebouncedYoutubeUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState<$VideoInfo | null>(null);
  const [theme, setTheme] = useTheme();

  const tryToGetCustomerInfo = async () => {
    if (!customerInfo?.customerID && !customerInfo?.temporaryID) return null;

    // we don't need to notify the user if this fails, because they might not
    // be our customer yet
    try {
      const response = await fetch(
        `${SERVER_URL}/api/customer-info?customerID=${
          customerInfo?.customerID ?? ""
        }&temporaryID=${customerInfo?.temporaryID ?? ""}`
      );

      const data = await response.json();

      return data.customerInfo;
    } catch (e) {
      return null;
    }
  };

  const getFeatures = async (videoID: string) => {
    const result: { keyPoints: $KeyPoints; titleAnswer: $TitleAnswer } = {
      keyPoints: {},
      titleAnswer: {},
    };

    try {
      const response = await fetch(
        `${SERVER_URL}/api/ready-content?videoID=${videoID}`
      );

      const data = await response.json();

      const { readyContent } = data;

      result.keyPoints = readyContent?.keyPoints;
      result.titleAnswer = readyContent?.titleAnswer;
    } catch (e) {}

    return result;
  };

  const debouncedOnChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDebouncedYoutubeUrl(e.target.value);
    },
    2000
  );

  const onYoutubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
    debouncedOnChange(e);
  };

  const getYoutubeVideoID = () => {
    // TODO
    // // return "VYJtb2YXae8";
    // return "-E9tslu9Oi8";
    if (!debouncedYoutubeUrl) return;

    // const regExp =
    //   /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const regExp =
      /(?:[?&]v=|\/embed\/|\/1\/|\/v\/|https:\/\/(?:www\.)?youtu\.be\/)([^&\n?#]+)/;
    const match = debouncedYoutubeUrl.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  useEffect(() => {
    try {
      const chain = async () => {
        const videoID = getYoutubeVideoID();

        const _customerInfo = await tryToGetCustomerInfo();
        setCustomerInfo((prevCustomerInfo) => ({
          ...prevCustomerInfo,
          ..._customerInfo,
        }));

        if (!videoID) return;

        const { keyPoints, titleAnswer } = await getFeatures(videoID);

        const keyPointsReady =
          !isNil(keyPoints?.s3SignedUrl) && !isNil(keyPoints?.transcript);
        const titleAnswerReady = !isNil(titleAnswer?.answer);

        setVideoInfo(() => ({
          videoID,
          keyPoints: {
            ...keyPoints,
            ready: keyPointsReady,
            inProgress: keyPoints?.inProgress,
          },
          titleAnswer: {
            ...titleAnswer,
            ready: titleAnswerReady,
            inProgress: titleAnswer?.inProgress,
          },
        }));
      };

      chain();
    } catch (e) {}
  }, [selectedFeature, debouncedYoutubeUrl]);

  return (
    <Context.CustomerContext.Provider value={{ customerInfo, setCustomerInfo }}>
      <Context.VideoContext.Provider value={{ videoInfo, setVideoInfo }}>
        <Context.ThemeContext.Provider value={{ theme, setTheme }}>
          <Container
            grid={{
              rows: "auto",
              cols: "1fr repeat(3, 2fr) 1fr",
              gap: "50px 10px",
            }}
            styles={{
              padding: "4px",
              minHeight: "unset",
            }}
          >
            <Container gridPosition={{ colPos: "1/6", rowPos: 1 }} noGrid>
              <Navbar />
            </Container>

            <Container
              gridPosition={{ colPos: "1/6", rowPos: 2 }}
              styles={{ flexDirection: "column", marginBottom: "40px" }}
              gap="40px"
              noGrid
              flex
            >
              <Heading.h4>Select Your Feature</Heading.h4>
              <Features
                selectedFeature={selectedFeature}
                setSelectedFeature={setSelectedFeature}
              />
            </Container>

            <Container
              gridPosition={[
                { colPos: "1/6", rowPos: 4, bp: "320px" },
                { colPos: "2/5", rowPos: 4, bp: "640px" },
              ]}
              styles={{ flexDirection: "column" }}
              gap="20px"
              noGrid
              flex
            >
              <Input
                onChange={onYoutubeUrlChange}
                value={youtubeUrl}
                size="large"
                placeholder="Paste Youtube Url"
                styles={{ width: "32rem" }}
              />
              <SelectedFeature selectedFeature={selectedFeature} />
            </Container>

            <Container
              gridPosition={{ colPos: "1/6", rowPos: 5 }}
              styles={{ flexDirection: "column" }}
              noGrid
              flex
            >
              <Heading.h4>Some of the examples</Heading.h4>
              <List
                items={[
                  "https://www.youtube.com/watch?v=InwZhPvjtl0",
                  "https://www.youtube.com/watch?v=c5-3gotpgz8",
                  "https://www.youtube.com/watch?v=Ju6Yj5QvIjY",
                ]}
              />
            </Container>

            <Container
              gridPosition={{ colPos: "2/5", rowPos: 7 }}
              styles={{ flexDirection: "column" }}
              gap="15px"
              noGrid
              flex
            >
              <Purchase />
            </Container>

            <Container gridPosition={{ colPos: "1/6", rowPos: 10 }} noGrid>
              <Footer />
            </Container>
          </Container>
        </Context.ThemeContext.Provider>
      </Context.VideoContext.Provider>
    </Context.CustomerContext.Provider>
  );
};

export default App;
