import { useState } from "react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Button, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text } from "@chakra-ui/react";

import CodeExample from "../../components/code/CodeExample";
import Dependencies from "../../components/code/Dependencies";
import useForceRerender from "../../hooks/useForceRerender";
import PropTable from "../../components/common/PropTable";
import CliInstallation from "../../components/code/CliInstallation";

import Stack from '../../content/Components/Stack/Stack';
import { stack } from '../../constants/code/Components/stackCode';

const StackDemo = () => {
  const [randomRotation, setRandomRotation] = useState(false);
  const [sensitivity, setSensitivity] = useState(200);
  const [cardWidth, setCardWidth] = useState(208);
  const [cardHeight, setCardHeight] = useState(208);
  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "randomRotation",
      type: "boolean",
      default: false,
      description: "Applies a random rotation to each card for a 'messy' look.",
    },
    {
      name: "sensitivity",
      type: "number",
      default: 200,
      description: "Drag sensitivity for sending a card to the back.",
    },
    {
      name: "cardDimensions",
      type: "object",
      default: "{ width: 208, height: 208 }",
      description: "Defines the width and height of the cards.",
    },
    {
      name: "sendToBackOnClick",
      type: "boolean",
      default: "false",
      description: "When enabled, the also stack shifts to the next card on click.",
    },
    {
      name: "cardsData",
      type: "array",
      default: "[]",
      description: "The array of card data, including `id` and `img` properties.",
    },
    {
      name: "animationConfig",
      type: "object",
      default: "{ stiffness: 260, damping: 20 }",
      description: "Configures the spring animation's stiffness and damping.",
    },
  ];

  const images = [
    { id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" },
    { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" },
    { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" },
    { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" minH={400} overflow="hidden">
          <Stack
            key={key}
            randomRotation={randomRotation}
            sensitivity={sensitivity}
            cardDimensions={{ width: cardWidth, height: cardHeight }}
            cardsData={images}
          />
        </Box>

        <div className="preview-options">
          <h2 className="demo-title-extra">Customize</h2>
          <Flex gap={2} wrap="wrap">
            <Button
              fontSize="xs"
              h={8}
              onClick={() => {
                setRandomRotation(!randomRotation);
                forceRerender();
              }}
            >
              Random Rotation:{" "}
              <Text color={randomRotation ? "lightgreen" : "coral"}>&nbsp;{String(randomRotation)}</Text>
            </Button>
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Sensitivity:</Text>
            <Slider
              min={100}
              max={300}
              step={10}
              value={sensitivity}
              onChange={(val) => {
                setSensitivity(val);
                forceRerender();
              }}
              width="200px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm">{sensitivity}</Text>
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Card Width:</Text>
            <Slider
              min={150}
              max={300}
              step={10}
              value={cardWidth}
              onChange={(val) => {
                setCardWidth(val);
                forceRerender();
              }}
              width="200px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm">{cardWidth}px</Text>
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Card Height:</Text>
            <Slider
              min={150}
              max={300}
              step={10}
              value={cardHeight}
              onChange={(val) => {
                setCardHeight(val);
                forceRerender();
              }}
              width="200px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm">{cardHeight}px</Text>
          </Flex>
        </div>

        <PropTable data={propData} />
        <Dependencies dependencyList={["framer-motion"]} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={stack} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...stack} />
      </CliTab>
    </TabbedLayout>
  );
};

export default StackDemo;
