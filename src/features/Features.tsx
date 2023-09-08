import { useState, useRef, useContext } from "react";
import { Container, Heading, List, Text } from "@allaround/all-components";
import cx from "classnames";
import debounce from "lodash.debounce";

import styles from "./Features.module.css";
import { $FEATURE_NAME } from "../types";
import { features } from "../constants";
import Context from "../context";

type Props = {
  selectedFeature: $FEATURE_NAME;
  setSelectedFeature: (feature: $FEATURE_NAME) => void;
};

type $HIDE_CONTENT = {
  [key in $FEATURE_NAME]: boolean;
};

const Features = ({ selectedFeature, setSelectedFeature }: Props) => {
  const [hideContent, setHideContent] = useState<$HIDE_CONTENT>({
    keyPoints: false,
    titleAnswer: false,
  });
  const featureRef = useRef<HTMLDivElement>(null);
  const { videoInfo } = useContext(Context.VideoContext);

  const setTo = (state: $HIDE_CONTENT, newValue: boolean) => {
    const newState = { ...state };
    for (const key in state) {
      newState[key as $FEATURE_NAME] = newValue;
    }

    return newState;
  };

  const onMouseEnter = debounce((feature: $FEATURE_NAME) => {
    setHideContent({ ...setTo(hideContent, true), [feature]: false });
  }, 100);

  const onMouseLeave = debounce(() => {
    setHideContent({
      ...setTo(hideContent, true),
      [selectedFeature]: false,
    });
  }, 100);

  const handleSelect = (feature: $FEATURE_NAME) => {
    setSelectedFeature(feature);

    setHideContent({ ...setTo(hideContent, true), [feature]: false });
  };

  return (
    <Container className={cx(styles.featuresContainer)} noGrid flex>
      {features.map((feature) => (
        <Container
          className={cx(
            styles.features,
            {
              [styles.featuresSelected]:
                selectedFeature === feature.feature &&
                !hideContent[feature.feature],
            },
            styles[`${feature.feature}BeforeColor`]
          )}
          onClick={() => handleSelect(feature.feature)}
          onMouseEnter={() => onMouseEnter(feature.feature)}
          onMouseLeave={onMouseLeave}
          key={feature.title}
          innerRef={featureRef}
          noGrid
          flex
        >
          <Container
            className={cx(styles.iconContainer, {
              [styles.iconContainerSelected]:
                selectedFeature === feature.feature,
              [styles.iconContainerSelectedContentHidden]:
                selectedFeature === feature.feature &&
                hideContent[feature.feature],
            })}
            noGrid
          >
            {feature.icon}

            {videoInfo?.[feature.feature]?.ready ? (
              <Text
                className={cx(styles.ready, {
                  [styles.readySelected]: selectedFeature === feature.feature,
                })}
              >
                READY
              </Text>
            ) : videoInfo?.[feature.feature]?.inProgress ? (
              <Text className={cx(styles.inProgress)}>IN PROGRESS</Text>
            ) : null}
          </Container>

          <Container
            className={cx(styles.hoverContent, {
              [styles.hoverContentSelected]:
                selectedFeature === feature.feature,
            })}
            noGrid
          >
            <Heading.h5
              className={cx(styles.heading, {
                [styles.headingSelected]:
                  selectedFeature === feature.feature &&
                  !hideContent[feature.feature],
              })}
            >
              {feature.title}
            </Heading.h5>
            <List
              className={cx(styles.description, {
                [styles.descriptionSelected]:
                  selectedFeature === feature.feature &&
                  !hideContent[feature.feature],
              })}
              bulletPosition="inside"
              items={feature.descriptions}
            />
          </Container>
        </Container>
      ))}
    </Container>
  );
};

export default Features;
