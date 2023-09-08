/// <reference types="chrome"/>
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { Video, hooks, Container } from "@allaround/all-components";

import { NOTIFICATION, SERVER_URL } from "../../constants";
import Context from "../../context";
import Generate, { GeneratePlaceholder } from "../generate";
import { $Transcript } from "../../types";
import InProgress from "../in-progress";
import { responsePredicate } from "../../helpers";
import Summaries from "./Summaries";

const { useNotification } = hooks;

type $KeyPointsResponseData = {
  s3SignedUrl: string;
  transcript: Array<$Transcript>;
};

const KeyPoints = () => {
  const { videoInfo, setVideoInfo } = useContext(Context.VideoContext);
  const { customerInfo, setCustomerInfo } = useContext(Context.CustomerContext);
  const [_inProgress, setInProgress] = useState<boolean>(false);
  const keyPointsVideoRef = useRef<HTMLVideoElement>(null);
  const { push: pushNotification, container: NotificationContainer } =
    useNotification({ position: "top" });

  const getTldr = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/tldr?videoID=${videoInfo?.videoID}`
      );

      const data = await response.json();

      return data.tldr;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    setInProgress(videoInfo?.keyPoints?.inProgress ?? false);
  }, [videoInfo]);

  useEffect(() => {
    if (_inProgress) return;
    if (videoInfo?.keyPoints?.s3SignedUrl && videoInfo?.keyPoints?.transcript)
      return;

    const chain = async () => {
      let tldr: $KeyPointsResponseData | null = null;

      if (videoInfo?.keyPoints?.ready) tldr = await getTldr();

      if (tldr) {
        const { s3SignedUrl, transcript } = tldr;
        setVideoInfo((prevVideoInfo) => ({
          ...prevVideoInfo,
          keyPoints: {
            ...prevVideoInfo?.keyPoints,
            s3SignedUrl,
            transcript,
          },
        }));
      }
    };

    chain();
  }, [_inProgress, videoInfo]);

  const generateKeyPoints = async () => {
    if (!customerInfo?.customerID) {
      pushNotification(NOTIFICATION.RESPONSE_INFO.name, {
        ...NOTIFICATION.RESPONSE_INFO,
        heading: "Not enough credits",
      });
      return;
    }

    const creditsPending = customerInfo?.creditsPending ?? 0;
    const creditsNeeded = videoInfo?.keyPoints?.creditsNeeded ?? 0;

    try {
      setInProgress(true);

      setCustomerInfo((prevCustomerInfo) => ({
        ...prevCustomerInfo,
        creditsPending: creditsPending + creditsNeeded,
      }));

      setVideoInfo((prevVideoInfo) => ({
        ...prevVideoInfo,
        keyPoints: {
          ...prevVideoInfo?.keyPoints,
          inProgress: true,
        },
      }));

      const response = await fetch(
        `${SERVER_URL}/api/generate-tldr?videoID=${videoInfo?.videoID}&customerID=${customerInfo?.customerID}`
      );

      const data = await response.json();

      const successfulResponse = responsePredicate(
        response,
        data,
        pushNotification
      );
      if (!successfulResponse) throw new Error("Response unsuccessful");

      const s3SignedUrl = data?.tldr?.s3SignedUrl;
      const transcript = data?.tldr?.transcript;

      if (!s3SignedUrl || !transcript) return;

      setVideoInfo((prevVideoInfo) => ({
        ...prevVideoInfo,
        keyPoints: {
          ...prevVideoInfo?.keyPoints,
          ready: true,
          s3SignedUrl,
          transcript,
        },
      }));

      setCustomerInfo((prevCustomerInfo) => {
        const creditsRemaining = prevCustomerInfo?.creditsRemaining ?? 0;

        return {
          ...prevCustomerInfo,
          creditsRemaining: creditsRemaining - creditsNeeded,
        };
      });
    } catch (e) {}

    setVideoInfo((prevVideoInfo) => ({
      ...prevVideoInfo,
      keyPoints: { ...prevVideoInfo?.keyPoints, inProgress: false },
    }));

    setCustomerInfo((prevCustomerInfo) => ({
      ...prevCustomerInfo,
      creditsPending,
    }));

    setInProgress(false);
  };

  const youtubeVideoTimestampHandler = async (timestamp: number) => {
    const query = await chrome.tabs?.query({
      active: true,
      lastFocusedWindow: true,
    });

    if (!query) return;

    const tabs = query[0];

    if (!tabs) return;

    await chrome.tabs?.sendMessage(tabs.id!, {
      from: "popup",
      subject: "YoutubeVideoTimestamp",
      timestamp,
    });
  };

  const keyPointsVideoTimestampHandler = async (timestamp: number) => {
    if (!keyPointsVideoRef.current) return;

    keyPointsVideoRef.current.currentTime = timestamp;
  };

  return (
    <>
      <NotificationContainer />
      {videoInfo?.keyPoints?.s3SignedUrl ? (
        <Container styles={{ flexDirection: "column" }} noGrid flex>
          <Video
            src={videoInfo?.keyPoints?.s3SignedUrl}
            ref={keyPointsVideoRef}
          />

          <Summaries
            videoInfo={videoInfo}
            keyPointsVideoTimestampHandler={keyPointsVideoTimestampHandler}
            youtubeVideoTimestampHandler={youtubeVideoTimestampHandler}
          />
        </Container>
      ) : (
        videoInfo?.videoID &&
        !videoInfo?.keyPoints?.ready &&
        !_inProgress && (
          <Suspense fallback={<GeneratePlaceholder />}>
            <Generate cb={generateKeyPoints} featureName="keyPoints" />
          </Suspense>
        )
      )}

      {_inProgress && <InProgress />}
    </>
  );
};

export default KeyPoints;
