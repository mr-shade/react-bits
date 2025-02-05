import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Button, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text } from "@chakra-ui/react";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/PropTable";
import reactbits from "../../assets/logos/reactbits-icon.svg";
import useForceRerender from "../../hooks/useForceRerender";

import { logoWall } from "../../constants/code/Components/logoWallCode";
import LogoWall from "../../content/Components/LogoWall/LogoWall";

const LogoWallDemo = () => {
  const [direction, setDirection] = useState("horizontal");
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [duration, setDuration] = useState(60);
  const [bgColor, setBgColor] = useState("#060606");
  const [bgAccentColor, setBgAccentColor] = useState("#090909");

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "items",
      type: "array",
      default: "[]",
      description: "List of logos to display, each object should have `imgUrl` and `altText`."
    },
    {
      name: "direction",
      type: "string",
      default: '"horizontal"',
      description: 'Scrolling direction, either "horizontal" or "vertical".'
    },
    {
      name: "pauseOnHover",
      type: "boolean",
      default: "true",
      description: "Pauses the scrolling animation when the user hovers over the wall."
    },
    {
      name: "size",
      type: "string",
      default: 'clamp(8rem, 1rem + 30vmin, 25rem)',
      description: "CSS size for each logo."
    },
    {
      name: "duration",
      type: "number",
      default: "60",
      description: "Animation duration in seconds."
    },
    {
      name: "textColor",
      type: "string",
      default: '"#ffffff"',
      description: "Text color for logos."
    },
    {
      name: "bgColor",
      type: "string",
      default: '"#060606"',
      description: "Background color."
    },
    {
      name: "bgAccentColor",
      type: "string",
      default: '"#111"',
      description: "Accent background color for the logos."
    }
  ];

  const logos = [
    { imgUrl: reactbits, altText: "React Bits Logo" },
    { imgUrl: reactbits, altText: "React Bits Logo" },
    { imgUrl: reactbits, altText: "React Bits Logo" },
    { imgUrl: reactbits, altText: "React Bits Logo" },
    { imgUrl: reactbits, altText: "React Bits Logo" },
    { imgUrl: reactbits, altText: "React Bits Logo" },
    { imgUrl: reactbits, altText: "React Bits Logo" }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" bg={bgColor} h={600} overflow="hidden">
          <LogoWall
            key={key} // Force re-render when state changes
            items={logos}
            direction={direction}
            pauseOnHover={pauseOnHover}
            size='clamp(8rem, 1rem + 20vmin, 25rem)'
            duration={`${duration}s`}
            bgColor={bgColor}
            bgAccentColor={bgAccentColor}
          />
        </Box>

        <div className="preview-options">
          <h2 className="demo-title-extra">Options</h2>
          <Flex gap={2} wrap="wrap">
            {/* Toggle Direction */}
            <Button
              fontSize="xs"
              h={8}
              onClick={() => {
                setDirection(direction === "vertical" ? "horizontal" : "vertical");
                forceRerender();
              }}
            >
              Direction: <Text color={"#a1a1aa"}>&nbsp;{String(direction)}</Text>
            </Button>

            {/* Toggle Pause on Hover */}
            <Button
              fontSize="xs"
              h={8}
              onClick={() => {
                setPauseOnHover(!pauseOnHover);
                forceRerender();
              }}
            >
              Pause on Hover: <Text color={pauseOnHover ? "lightgreen" : "coral"}>&nbsp;{String(pauseOnHover)}</Text>
            </Button>
          </Flex>

          {/* Duration Slider */}
          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Animation Speed:</Text>
            <Slider
              min={10}
              max={120}
              step={5}
              value={duration}
              onChange={(val) => {
                setDuration(val);
                forceRerender();
              }}
              width="200px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm">{duration}s</Text>
          </Flex>

          {/* Background Color Picker */}
          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Background Color:</Text>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => {
                setBgColor(e.target.value);
                forceRerender();
              }}
              width="60px"
            />
          </Flex>

          {/* Background Accent Color Picker */}
          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Background Accent:</Text>
            <input
              type="color"
              value={bgAccentColor}
              onChange={(e) => {
                setBgAccentColor(e.target.value);
                forceRerender();
              }}
              width="60px"
            />
          </Flex>
        </div>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={logoWall} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...logoWall} />
      </CliTab>
    </TabbedLayout>
  );
};

export default LogoWallDemo;
