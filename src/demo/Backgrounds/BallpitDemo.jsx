import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Text } from "@chakra-ui/react";

import RefreshButton from "../../components/common/Preview/RefreshButton";
import CodeExample from "../../components/code/CodeExample";
import Dependencies from "../../components/code/Dependencies";
import useForceRerender from "../../hooks/useForceRerender";
import PropTable from "../../components/common/Preview/PropTable";
import CliInstallation from "../../components/code/CliInstallation";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import Customize from "../../components/common/Preview/Customize";

import Ballpit from "../../content/Backgrounds/Ballpit/Ballpit";
import { ballpit } from '../../constants/code/Backgrounds/ballpitCode';

const BallpitDemo = () => {
  const [count, setCount] = useState(100);
  const [gravity, setGravity] = useState(0.5);
  const [friction, setFriction] = useState(0.9975);
  const [wallBounce, setWallBounce] = useState(0.95);
  const [followCursor, setFollowCursor] = useState(false);
  const colors = [0xffffff, 0x000000, 0x5227FF];

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "count",
      type: "number",
      default: "200",
      description: "Sets the number of balls in the ballpit.",
    },
    {
      name: "gravity",
      type: "number",
      default: "0.5",
      description: "Controls the gravity affecting the balls.",
    },
    {
      name: "friction",
      type: "number",
      default: "0.9975",
      description: "Sets the friction applied to the ball movement.",
    },
    {
      name: "wallBounce",
      type: "number",
      default: "0.95",
      description: "Determines how much balls bounce off walls.",
    },
    {
      name: "followCursor",
      type: "boolean",
      default: "true",
      description: "Enables or disables the sphere following the cursor.",
    },
    {
      name: "colors",
      type: "array",
      default: "[0, 0, 0]",
      description: "Defines the colors of the balls.",
    },
    {
      name: "ambientColor",
      type: "number",
      default: "16777215",
      description: "Sets the ambient light color.",
    },
    {
      name: "ambientIntensity",
      type: "number",
      default: "1",
      description: "Controls the intensity of ambient light.",
    },
    {
      name: "lightIntensity",
      type: "number",
      default: "200",
      description: "Sets the intensity of the main light source.",
    },
    {
      name: "minSize",
      type: "number",
      default: "0.5",
      description: "Specifies the minimum size of the balls.",
    },
    {
      name: "maxSize",
      type: "number",
      default: "1",
      description: "Specifies the maximum size of the balls.",
    },
    {
      name: "size0",
      type: "number",
      default: "1",
      description: "Initial size value for the cursor ball.",
    },
    {
      name: "maxVelocity",
      type: "number",
      default: "0.15",
      description: "Limits the maximum velocity of the balls.",
    },
    {
      name: "maxX",
      type: "number",
      default: "5",
      description: "Defines the maximum X-coordinate boundary.",
    },
    {
      name: "maxY",
      type: "number",
      default: "5",
      description: "Defines the maximum Y-coordinate boundary.",
    },
    {
      name: "maxZ",
      type: "number",
      default: "2",
      description: "Defines the maximum Z-coordinate boundary.",
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" minH={500} maxH={500} overflow="hidden">
          <RefreshButton onClick={forceRerender} />
          <Text fontSize='200px' fontWeight={900} color="#271E37" position="absolute" zIndex={0}>Balls.</Text>
          <Ballpit
            className="ballpit-demo"
            key={key}
            count={count}
            gravity={gravity}
            friction={friction}
            wallBounce={wallBounce}
            followCursor={followCursor}
            colors={colors}
          />
        </Box>

        <Customize>
          <PreviewSwitch
            title="Display Cursor"
            isChecked={followCursor}
            onChange={(checked) => {
              setFollowCursor(checked);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Ball Count"
            min={50}
            max={500}
            step={10}
            value={count}
            onChange={(val) => {
              setCount(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Gravity"
            min={0.1}
            max={1}
            step={0.1}
            value={gravity}
            onChange={(val) => {
              setGravity(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Friction"
            min={0.9}
            max={1}
            step={0.001}
            value={friction}
            onChange={(val) => {
              setFriction(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Wall Bounce"
            min={0.5}
            max={1}
            step={0.05}
            value={wallBounce}
            onChange={(val) => {
              setWallBounce(val);
              forceRerender();
            }}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={["three"]} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={ballpit} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...ballpit} />
      </CliTab>
    </TabbedLayout>
  );
};

export default BallpitDemo;
