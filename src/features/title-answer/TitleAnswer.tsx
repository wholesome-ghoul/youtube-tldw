import { Container, hooks } from "@allaround/all-components";
import { Suspense, useContext, useEffect, useState } from "react";

import { NOTIFICATION, SERVER_URL } from "../../constants";
import Context from "../../context";
import { responsePredicate } from "../../helpers";
import Generate, { GeneratePlaceholder } from "../generate";
import InProgress from "../in-progress";
import Answer from "./Answer";

const { useNotification } = hooks;

type $TitleAnswerResponseData = {
  answer: string;
};

const TitleAnswer = () => {
  const { videoInfo, setVideoInfo } = useContext(Context.VideoContext);
  const { customerInfo, setCustomerInfo } = useContext(Context.CustomerContext);
  const [_inProgress, setInProgress] = useState<boolean>(false);
  const { push: pushNotification, container: NotificationContainer } =
    useNotification({ position: "top" });

  const getTA = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/ta?videoID=${videoInfo?.videoID}`
      );

      const data = await response.json();

      return data.ta;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    setInProgress(videoInfo?.titleAnswer?.inProgress ?? false);
  }, [videoInfo]);

  useEffect(() => {
    if (_inProgress) return;
    if (videoInfo?.titleAnswer?.answer) return;

    const chain = async () => {
      let ta: $TitleAnswerResponseData | null = null;

      if (videoInfo?.titleAnswer?.ready) ta = await getTA();

      if (ta) {
        const { answer } = ta;
        setVideoInfo((prevVideoInfo) => ({
          ...prevVideoInfo,
          titleAnswer: {
            ...prevVideoInfo?.titleAnswer,
            answer,
          },
        }));
      }
    };

    chain();
  }, [_inProgress, videoInfo]);

  const generateTitleAnswer = async () => {
    if (!customerInfo?.customerID) {
      pushNotification(NOTIFICATION.RESPONSE_INFO.name, {
        ...NOTIFICATION.RESPONSE_INFO,
        heading: "Not enough credits",
      });
      return;
    }

    const creditsPending = customerInfo?.creditsPending ?? 0;
    const creditsNeeded = videoInfo?.titleAnswer?.creditsNeeded ?? 0;

    try {
      setInProgress(true);

      setCustomerInfo((prevCustomerInfo) => ({
        ...prevCustomerInfo,
        creditsPending: creditsPending + creditsNeeded,
      }));

      setVideoInfo((prevVideoInfo) => ({
        ...prevVideoInfo,
        titleAnswer: {
          ...prevVideoInfo?.titleAnswer,
          inProgress: true,
        },
      }));

      const response = await fetch(
        `${SERVER_URL}/api/generate-ta?videoID=${videoInfo?.videoID}&customerID=${customerInfo?.customerID}`
      );

      const data = await response.json();

      const successfulResponse = responsePredicate(
        response,
        data,
        pushNotification
      );
      if (!successfulResponse) throw new Error("Response unsuccessful");

      const answer = data?.ta?.answer;

      if (!answer) return;

      setVideoInfo((prevVideoInfo) => ({
        ...prevVideoInfo,
        titleAnswer: {
          ...prevVideoInfo?.titleAnswer,
          ready: true,
          answer,
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
      titleAnswer: { ...prevVideoInfo?.titleAnswer, inProgress: false },
    }));

    setCustomerInfo((prevCustomerInfo) => ({
      ...prevCustomerInfo,
      creditsPending,
    }));

    setInProgress(false);
  };

  return (
    <>
      <NotificationContainer />
      {videoInfo?.titleAnswer?.answer ? (
        <Answer answer={videoInfo?.titleAnswer?.answer} />
      ) : (
        videoInfo?.videoID &&
        !videoInfo?.titleAnswer?.ready &&
        !_inProgress && (
          <Suspense fallback={<GeneratePlaceholder />}>
            <Generate cb={generateTitleAnswer} featureName="titleAnswer" />
          </Suspense>
        )
      )}

      {_inProgress && <InProgress />}
    </>
  );
};

export default TitleAnswer;
