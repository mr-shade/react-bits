import { Flex } from "@chakra-ui/react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { CODE_EXAMPLES } from "../../constants/ExampleConstants";

import Waves from "../../content/Backgrounds/Waves/Waves";
import CodeExample from '../../components/code/CodeExample';
import PropTable from "../../components/common/PropTable";
import CliInstallation from "../../components/code/CliInstallation";

const WavesDemo = () => {
  const { waves } = CODE_EXAMPLES;

  const propData = [
    {
      name: "lineColor",
      type: "string",
      default: "black",
      description: "Defines the color of the wave lines drawn on the canvas."
    },
    {
      name: "backgroundColor",
      type: "string",
      default: "transparent",
      description: "Sets the background color of the waves container."
    },
    {
      name: "waveSpeedX",
      type: "number",
      default: 0.0125,
      description: "Horizontal speed factor for the wave animation."
    },
    {
      name: "waveSpeedY",
      type: "number",
      default: 0.005,
      description: "Vertical speed factor for the wave animation."
    },
    {
      name: "waveAmpX",
      type: "number",
      default: 32,
      description: "Horizontal amplitude of each wave."
    },
    {
      name: "waveAmpY",
      type: "number",
      default: 16,
      description: "Vertical amplitude of each wave."
    },
    {
      name: "xGap",
      type: "number",
      default: 10,
      description: "Horizontal gap between individual wave lines."
    },
    {
      name: "yGap",
      type: "number",
      default: 32,
      description: "Vertical gap between points on each wave line."
    },
    {
      name: "friction",
      type: "number",
      default: 0.925,
      description: "Controls how quickly the cursor effect slows down."
    },
    {
      name: "tension",
      type: "number",
      default: 0.005,
      description: "Determines the 'springiness' of the cursor effect on points."
    },
    {
      name: "maxCursorMove",
      type: "number",
      default: 100,
      description: "Limits how far each point can shift due to cursor movement."
    },
    {
      name: "style",
      type: "object",
      default: "{}",
      description: "Inline styles applied to the container element."
    },
    {
      name: "className",
      type: "string",
      default: "",
      description: "Custom class name(s) applied to the container element."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Flex overflow="hidden" justifyContent="center" alignItems="center" minH={400} position="relative" pb={"4em"} className="demo-container">
          <Waves
            lineColor="#fff"
          />
        </Flex>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={waves} />
      </CodeTab>

      <CliTab>
        <CliInstallation cliDefault={waves.cliDefault} cliTailwind={waves.cliTailwind}/>
      </CliTab>
    </TabbedLayout>

  );
}

export default WavesDemo;