import LocalIcons from "./icons";
import {
  $FEATURES,
  $FEATURE_NAME,
  $Notification,
  $NotificationTypes,
} from "./types";

export const SERVER_URL = process.env.SERVER_URL;
export const PAYPAL_BUTTON_URL = process.env.PAYPAL_BUTTON_URL;
export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;

export const featureDisplayNames: Record<$FEATURE_NAME, string> = {
  keyPoints: "Key Points",
  titleAnswer: "Title Answer",
};

export const NOTIFICATION: Record<$NotificationTypes, $Notification> = {
  RESPONSE_CRITICAL: {
    name: "response-critical-error",
    heading: "Something went wrong",
    content: "Please try again.",
    variant: "alert",
  },
  RESPONSE_INFO: {
    name: "response-info",
    variant: "info",
  },
  RESPONSE_SUCCESS: {
    name: "response-success",
    variant: "success",
    heading: "Success!",
  },
};

export const features: Array<$FEATURES> = [
  {
    title: featureDisplayNames.keyPoints,
    icon: <LocalIcons.KP fill="white" width="36px" height="36px" />,
    descriptions: ["Get key points from video"],
    feature: "keyPoints",
  },
  {
    title: featureDisplayNames.titleAnswer,
    icon: <LocalIcons.TA fill="white" width="36px" height="36px" />,
    descriptions: ["Get title answer from video"],
    feature: "titleAnswer",
  },
];

export const socials = {
  discord: "https://discord.gg/pKYAsjuD",
  github: "https://github.com/wholesome-ghoul",
  mail: "mailto:wholesome.ghoul@gmail.com",
};
