import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Flex, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Input } from "@chakra-ui/react";

import Customize from "../../components/common/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/PropTable";
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from "../../hooks/useForceRerender";
import RefreshButton from "../../components/common/RefreshButton";

import { silkCode } from '../../constants/code/Backgrounds/silkCode';
import Silk from '../../content/Backgrounds/Silk/Silk';

const SilkDemo = () => {
  const [speed, setSpeed] = useState(5);
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState("#7B7481");
  const [noiseIntensity, setNoiseIntensity] = useState(1.5);
  const [rotation, setRotation] = useState(0);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "speed",
      type: "number",
      default: "5",
      description: "Controls the animation speed of the silk effect."
    },
    {
      name: "scale",
      type: "number",
      default: "1",
      description: "Controls the scale of the silk pattern."
    },
    {
      name: "color",
      type: "string",
      default: "'#7B7481'",
      description: "Hex color code for the silk pattern."
    },
    {
      name: "noiseIntensity",
      type: "number",
      default: "1.5",
      description: "Controls the intensity of the noise effect."
    },
    {
      name: "rotation",
      type: "number",
      default: "0",
      description: "Controls the rotation of the silk pattern (in radians)."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
          <RefreshButton onClick={forceRerender} />
          <Silk
            key={key}
            speed={speed}
            scale={scale}
            color={color}
            noiseIntensity={noiseIntensity}
            rotation={rotation}
          />
        </Box>

        <Customize>
          <Flex direction="column" gap={4}>
            <Flex align="center" gap={2}>
              <Text fontSize="sm" w="120px">Speed:</Text>
              <Slider
                min={0.1}
                max={20}
                step={0.1}
                value={speed}
                onChange={(val) => {
                  setSpeed(val);
                  forceRerender();
                }}
                width="200px"
              >
                <SliderTrack><SliderFilledTrack /></SliderTrack>
                <SliderThumb />
              </Slider>
              <Text fontSize="sm" w="50px">{speed.toFixed(1)}</Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Text fontSize="sm" w="120px">Scale:</Text>
              <Slider
                min={0.1}
                max={5}
                step={0.1}
                value={scale}
                onChange={(val) => {
                  setScale(val);
                  forceRerender();
                }}
                width="200px"
              >
                <SliderTrack><SliderFilledTrack /></SliderTrack>
                <SliderThumb />
              </Slider>
              <Text fontSize="sm" w="50px">{scale.toFixed(1)}</Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Text fontSize="sm" w="120px">Noise Intensity:</Text>
              <Slider
                min={0}
                max={10}
                step={0.1}
                value={noiseIntensity}
                onChange={(val) => {
                  setNoiseIntensity(val);
                  forceRerender();
                }}
                width="200px"
              >
                <SliderTrack><SliderFilledTrack /></SliderTrack>
                <SliderThumb />
              </Slider>
              <Text fontSize="sm" w="50px">{noiseIntensity.toFixed(1)}</Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Text fontSize="sm" w="120px">Rotation:</Text>
              <Slider
                min={0}
                max={Math.PI * 2}
                step={0.01}
                value={rotation}
                onChange={(val) => {
                  setRotation(val);
                  forceRerender();
                }}
                width="200px"
              >
                <SliderTrack><SliderFilledTrack /></SliderTrack>
                <SliderThumb />
              </Slider>
              <Text fontSize="sm" w="50px">{rotation.toFixed(2)}</Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Text fontSize="sm" w="120px">Color:</Text>
              <Input
                type="color"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                  forceRerender();
                }}
                width="100px"
              />
            </Flex>
          </Flex>
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three', '@react-three/fiber']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={silkCode} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...silkCode} />
      </CliTab>
    </TabbedLayout>
  );
};

export default SilkDemo;