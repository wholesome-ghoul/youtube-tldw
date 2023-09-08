import type {NotificationProps} from "@allaround/all-components/dist/types";

const FEATURE_NAMES = ["keyPoints", "titleAnswer"] as const
export type $FEATURE_NAME = typeof FEATURE_NAMES[number]

export type $CustomerInfo = {
  token?: string | null;
  creditsRemaining?: number | null;
  creditsPending?: number | null;
  customerID?: string | null;
  temporaryID?: string | null;
}

export type $CustomerInfoContext = {
  customerInfo: $CustomerInfo | null;
  setCustomerInfo: React.Dispatch<React.SetStateAction<$CustomerInfo | null>>
}

export type $Transcript = {
  summary: string;
  start: number;
  end: number;
};

export type $KeyPoints = {
  s3SignedUrl?: string | null;
  transcript?: Array<$Transcript> | null;
  inProgress?: boolean | null;
  ready?: boolean | null;
  creditsNeeded?: number | null;
}

export type $TitleAnswer = {
  answer?: string | null;
  inProgress?: boolean | null;
  ready?: boolean | null;
  creditsNeeded?: number | null;
}

export type $VideoInfo = {
  videoID?: string | null;
  keyPoints?: $KeyPoints | null;
  titleAnswer?: $TitleAnswer | null;
}

export type $VideoInfoContext = {
  videoInfo: $VideoInfo | null;
  setVideoInfo: React.Dispatch<React.SetStateAction<$VideoInfo | null>>
}

export type $NotificationTypes = "RESPONSE_CRITICAL" | "RESPONSE_INFO" | "RESPONSE_SUCCESS"

export type $Notification = 
  Pick<NotificationProps, "variant" | "heading" | "content"> & {
  name: string;
}

export type $FEATURES = {
  title: string;
  icon: JSX.Element;
  descriptions: string[];
  feature: $FEATURE_NAME;
};

export type $Theme = "dark" | "light"

export type $ThemeContext = {
  theme: $Theme;
  setTheme: React.Dispatch<React.SetStateAction<$Theme>>
}
