import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Switch, Text } from "@chakra-ui/react";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/PropTable";
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from "../../hooks/useForceRerender";

import Iridescence from "../../content/Backgrounds/Iridescence/Iridescence";
import { iridescence } from "../../constants/code/Backgrounds/iridescenceCode";

const IridescenceDemo = () => {
  const [color1, setColor1] = useState(1);
  const [color2, setColor2] = useState(1);
  const [color3, setColor3] = useState(1);

  const [speed, setSpeed] = useState(1);
  const [mouseInteraction, setMouseInteraction] = useState(true);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "color",
      type: "Array<number>",
      default: "[0.3, 0.2, 0.5]",
      description: "Base color as an array of RGB values (each between 0 and 1)."
    },
    {
      name: "speed",
      type: "number",
      default: "1.0",
      description: "Speed multiplier for the animation."
    },
    {
      name: "amplitude",
      type: "number",
      default: "0.1",
      description: "Amplitude for the mouse-driven effect."
    },
    {
      name: "mouseReact",
      type: "boolean",
      default: "false",
      description: "Enable or disable mouse interaction with the shader."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
          <Iridescence key={key} speed={speed} color={[color1, color2, color3]} mouseReact={mouseInteraction} />
        </Box>

        <div className="preview-options">
          <h2 className="demo-title-extra">Options</h2>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Mouse Interaction</Text>
            <Switch
              isChecked={mouseInteraction}
              onChange={(e) => {
                setMouseInteraction(e.target.checked);
                forceRerender();
              }}
            />
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Red</Text>
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={color1}
              onChange={(val) => {
                setColor1(val);
                forceRerender();
              }}
              width="200px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm">{color1}</Text>
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Green</Text>
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={color2}
              onChange={(val) => {
                setColor2(val);
                forceRerender();
              }}
              width="200px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm">{color2}</Text>
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Blue</Text>
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={color3}
              onChange={(val) => {
                setColor3(val);
                forceRerender();
              }}
              width="200px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm">{color3}</Text>
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Speed</Text>
            <Slider
              min={0}
              max={2}
              step={0.1}
              value={speed}
              onChange={(val) => {
                setSpeed(val);
                forceRerender();
              }}
              width="200px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm">{speed}</Text>
          </Flex>
        </div>

        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={iridescence} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...iridescence} />
      </CliTab>
    </TabbedLayout>
  );
};

export default IridescenceDemo;