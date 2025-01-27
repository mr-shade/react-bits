import React, { useState } from "react";
import {
  Box,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";
import {
  CliTab,
  CodeTab,
  PreviewTab,
  TabbedLayout,
} from "../../components/common/TabbedLayout";
import RefreshButton from "../../components/common/RefreshButton";
import CodeExample from "../../components/code/CodeExample";
import PropTable from "../../components/common/PropTable";
import CliInstallation from "../../components/code/CliInstallation";

import Noise from "../../ts-default/Animations/Noise/Noise";
import { noise } from "../../constants/code/Animations/noiseCode";

const propData = [
  {
    name: "patternSize",
    type: "number",
    default: 250,
    description: "Defines the size of the grain pattern.",
  },
  {
    name: "patternScaleX",
    type: "number",
    default: 1,
    description: "Scaling factor for the X-axis of the grain pattern.",
  },
  {
    name: "patternScaleY",
    type: "number",
    default: 1,
    description: "Scaling factor for the Y-axis of the grain pattern.",
  },
  {
    name: "patternRefreshInterval",
    type: "number",
    default: 2,
    description: "Number of frames before the grain pattern refreshes.",
  },
  {
    name: "patternAlpha",
    type: "number",
    default: 15,
    description: "Opacity of the grain pattern (0-255).",
  },
];

const NoiseDemo: React.FC = () => {
  const [settings, setSettings] = useState({
    patternSize: 250,
    patternScaleX: 1,
    patternScaleY: 1,
    patternAlpha: 15,
  });

  const handleChange = (key: string, value: number) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <TabbedLayout>
      {/* Preview Tab */}
      <PreviewTab>
        <Box
          position="relative"
          background="#060606"
          minH={400}
          overflow="hidden"
          className="demo-container"
        >
          <Text
            color="#111"
            fontSize="6rem"
            fontWeight={900}
            textAlign="center"
          >
            Ooh, edgy!
          </Text>
          <Noise
            key={JSON.stringify(settings)}
            {...settings}
          />
          <RefreshButton
            onClick={() => setSettings({ ...settings })} // Force rerender
          />
        </Box>

        {/* Options Panel */}
        <div className="preview-options">
          <h2 className="demo-title-extra">Options</h2>
          {[
            {
              label: "Pattern Size",
              min: 50,
              max: 500,
              step: 10,
              value: settings.patternSize,
              key: "patternSize",
              unit: "px",
            },
            {
              label: "Scale X",
              min: 0.1,
              max: 5,
              step: 0.1,
              value: settings.patternScaleX,
              key: "patternScaleX",
              unit: "",
            },
            {
              label: "Scale Y",
              min: 0.1,
              max: 5,
              step: 0.1,
              value: settings.patternScaleY,
              key: "patternScaleY",
              unit: "",
            },
            {
              label: "Pattern Alpha",
              min: 0,
              max: 25,
              step: 5,
              value: settings.patternAlpha,
              key: "patternAlpha",
              unit: "",
            },
          ].map((slider) => (
            <Flex key={slider.key} gap={4} align="center" mt={4}>
              <Text fontSize="sm">{slider.label}:</Text>
              <Slider
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={slider.value}
                onChange={(val) => handleChange(slider.key, val)}
                width="200px"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Text fontSize="sm">
                {slider.value}
                {slider.unit}
              </Text>
            </Flex>
          ))}
        </div>

        {/* Props Table */}
        <PropTable data={propData} />
      </PreviewTab>

      {/* Code Tab */}
      <CodeTab>
        <CodeExample codeObject={noise} />
      </CodeTab>

      {/* CLI Tab */}
      <CliTab>
        <CliInstallation
          cliDefault={noise.cliDefault}
          cliTailwind={noise.cliTailwind}
        />
      </CliTab>
    </TabbedLayout>
  );
};

export default NoiseDemo;
