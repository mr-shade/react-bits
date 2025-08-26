import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Code,
  Image,
  Link,
  Button,
} from "@chakra-ui/react";
import {
  CodeTab,
  PreviewTab,
  CliTab,
  TabsLayout,
} from "../../components/common/TabsLayout";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import PreviewSelect from "../../components/common/Preview/PreviewSelect";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";

import { gradualBlur } from "../../constants/code/Animations/gradualblurCode";
import GradualBlur from "../../content/Animations/GradualBlur/GradualBlur";

const GradualBlurDemo = () => {
  const propData = [
    {
      name: "position",
      type: `"top" | "bottom | left | right"`,
      default: `"bottom"`,
      description: "Position of the blur overlay.",
    },
    {
      name: "strength",
      type: "number",
      default: "2",
      description: "Overall blur strength multiplier.",
    },
    {
      name: "height",
      type: "string",
      default: `"7rem"`,
      description: "Height of the blur region.",
    },
    {
      name: "width",
      type: "string",
      default: `"100%"`,
      description: "Width of the blur region.",
    },
    {
      name: "divCount",
      type: "number",
      default: "5",
      description: "Number of stacked blur layers.",
    },
    {
      name: "exponential",
      type: "boolean",
      default: "false",
      description: "Use exponential blur progression.",
    },
    {
      name: "animated",
      type: `"boolean" | "scroll"`,
      default: "false",
      description: "Enable animation or scroll-based reveal.",
    },
    {
      name: "duration",
      type: "string",
      default: `"0.3s"`,
      description: "Animation duration.",
    },
    {
      name: "easing",
      type: "string",
      default: `"ease-out"`,
      description: "Animation easing function.",
    },
    {
      name: "opacity",
      type: "number",
      default: "1",
      description: "Layer opacity.",
    },
    {
      name: "curve",
      type: `"linear" | "bezier" | "ease-in-out"`,
      default: `"linear"`,
      description: "Controls blur progression curve.",
    },
    {
      name: "responsive",
      type: "boolean",
      default: "false",
      description: "Enable responsive heights.",
    },
    {
      name: "preset",
      type: `"top" | "bottom"`,
      default: "—",
      description: "Quickly apply a preset config.",
    },
    {
      name: "gpuOptimized",
      type: "boolean",
      default: "false",
      description: "Enable GPU optimization (`will-change`).",
    },
    {
      name: "hoverIntensity",
      type: "number",
      default: "—",
      description: "Increase blur strength on hover.",
    },
    {
      name: "target",
      type: `"parent" | "page"`,
      default: `"parent"`,
      description: "Position relative to parent container or entire page.",
    },
    {
      name: "onAnimationComplete",
      type: "() => void",
      default: "—",
      description: "Callback after animation finishes.",
    },
    {
      name: "className",
      type: "string",
      default: "—",
      description: "Custom CSS class.",
    },
    {
      name: "style",
      type: "React.CSSProperties",
      default: "—",
      description: "Inline style overrides.",
    },
  ];

  const [blurProps, setBlurProps] = useState({
    position: "bottom",
    strength: 2,
    height: "7rem",
    divCount: 5,
    curve: "linear",
    exponential: false,
    opacity: 1,
  });

  return (
    <TabsLayout>
      <PreviewTab>
        <Box
          position="relative"
          className="demo-container"
          h="200vh" // Visible height
          overflowY="auto" // Make it vertically scrollable
          overflowX="hidden"
          // pr={3}
        >
          <Heading
            position="absolute"
            left="0px"
            top="50%"
            transform="translateY(-50%) rotate(-90deg)"
            fontSize="9vh"
            whiteSpace="nowrap"
            zIndex={50}
            color="white"
            textShadow="2px 2px 4px rgba(0,0,0,0.5)"
          >
            Gradual Blur
          </Heading>

          {/* Right side rotated text */}
          <Heading
            position="absolute"
            right="0px"
            top="50%"
            transform="translateY(-50%) rotate(90deg)"
            fontSize="8vh"
            whiteSpace="nowrap"
            zIndex={50}
            color="white"
            textShadow="2px 2px 4px rgba(0,0,0,0.5)"
          >
            Gradual Blur
          </Heading>

          {/* GradualBlur effect - controlled by position prop */}
          <GradualBlur
            {...blurProps}
            target="page"
            zIndex={-1}
            width={blurProps.position === 'left' || blurProps.position === 'right' ? "25rem" : "100%"}
            height={blurProps.position === 'top' ? "14rem" : blurProps.height}
          />

          {/* Top text */}
          <Heading position="absolute" top="10vh" fontSize="20vh" zIndex={50}>
            Scroll Down
          </Heading>

          <Box
            marginY="100px"
            bg="white"
            borderRadius="5px"
            overflow="hidden"
            boxShadow="0 4px 20px rgba(0,0,0,0.2)"
            display="flex"
            flexDirection="column"
            height="500px"
          >
            {/* Profile Image */}
            <Image
              padding="0.5"
              src="/assets/Person2.png"
              alt="Ansh Dhanani"
              w="100%"
              h="440px"
              objectFit="cover"
            />

            {/* Name & Link - positioned at bottom */}
            <Box p={4} >
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold" fontSize="lg" color="black" mb={-4}>
                  Ansh Dhanani
                </Text>
                <Link
                  href="https://github.com/Ansh-dhanani"
                  fontSize="13px"
                  color="gray.500"
                  isExternal
                >
                  @dhanani._ansh
                </Link>
              </VStack>
            </Box>
          </Box>

          {/* Bottom text */}
          <Heading position="absolute" bottom="87px" fontSize="20vh" zIndex={50}>
            Gradual Blur
          </Heading>
        </Box>

        {/* Controls */}
        <Customize>
          <PreviewSelect
            title="Position"
            name="gradual-blur-position"
            value={blurProps.position}
            options={[
              { label: "Top", value: "top" },
              { label: "Bottom", value: "bottom" }
            ]}
            onChange={(v) => setBlurProps((p) => ({ ...p, position: v }))}
          />
          <PreviewSelect
            title="Curve"
            name="gradual-blur-curve"
            value={blurProps.curve}
            options={[
              { label: "Linear", value: "linear" },
              { label: "Bezier", value: "bezier" },
              { label: "Ease In Out", value: "ease-in-out" },
            ]}
            onChange={(v) => setBlurProps((p) => ({ ...p, curve: v }))}
          />
          <PreviewSelect
            title="Exponential"
            name="gradual-blur-exponential"
            value={blurProps.exponential.toString()}
            options={[
              { label: "True", value: "true" },
              { label: "False", value: "false" },
            ]}
            onChange={(v) => setBlurProps((p) => ({ ...p, exponential: v === "true" }))}
          />
          <PreviewSlider
            title="Strength"
            min={1}
            max={5}
            step={0.5}
            value={blurProps.strength}
            onChange={(v) => setBlurProps((p) => ({ ...p, strength: v }))}
          />
          <PreviewSlider
            title="Div Count"
            min={1}
            max={10}
            step={1}
            value={blurProps.divCount}
            onChange={(v) => setBlurProps((p) => ({ ...p, divCount: v }))}
          />
          <PreviewSlider
            title="Opacity"
            min={0.1}
            max={1}
            step={0.1}
            value={blurProps.opacity}
            onChange={(v) => setBlurProps((p) => ({ ...p, opacity: v }))}
          />
        </Customize>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={gradualBlur} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...gradualBlur} />
      </CliTab>
    </TabsLayout>
  );
};

export default GradualBlurDemo;
