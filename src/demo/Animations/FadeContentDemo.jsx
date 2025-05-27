import { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";

import RefreshButton from "../../components/common/RefreshButton";
import CodeExample from "../../components/code/CodeExample";
import useForceRerender from "../../hooks/useForceRerender";
import PropTable from "../../components/common/PropTable";
import CliInstallation from "../../components/code/CliInstallation";
import PreviewSlider from "../../components/common/PreviewSlider";
import PreviewSwitch from "../../components/common/PreviewSwitch";
import Customize from "../../components/common/Customize";

import FadeContent from "../../content/Animations/FadeContent/FadeContent";
import { fadeContent } from '../../constants/code/Animations/fadeContentCode';

const FadeDemo = () => {
  const [blur, setBlur] = useState(false);
  const [delay, setDelay] = useState(0);
  const [duration, setDuration] = useState(1000);
  const [easing, setEasing] = useState("ease-out");
  const [threshold, setThreshold] = useState(0.1);
  const [initialOpacity, setInitialOpacity] = useState(0);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: 'blur',
      type: 'boolean',
      default: 'false',
      description: 'Enables a blur effect during the animation.',
    },
    {
      name: 'duration',
      type: 'number',
      default: 1000,
      description: 'Specifies the duration of the fade animation in milliseconds.',
    },
    {
      name: 'delay',
      type: 'number',
      default: '0',
      description: 'Adds a delay in milliseconds before triggering the animation.',
    },
    {
      name: 'easing',
      type: 'string',
      default: 'ease-out',
      description: 'Defines the easing function for the fade transition.',
    },
    {
      name: 'threshold',
      type: 'number',
      default: 0.1,
      description: 'IntersectionObserver threshold for triggering the fade animation.',
    },
    {
      name: 'initialOpacity',
      type: 'number',
      default: 0,
      description: 'The starting opacity of the component before it enters the viewport.',
    },
    {
      name: 'className',
      type: 'string',
      default: '',
      description: 'Custom class(es) to be added to the container.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" minH={200}>
          <FadeContent
            key={key}
            blur={blur}
            duration={duration}
            delay={delay}
            easing={easing}
            threshold={threshold}
            initialOpacity={initialOpacity}
          >
            <Flex
              fontSize="xl"
              fontWeight="bolder"
              justifyContent="center"
              alignItems="center"
              color="#fff"
              h={100}
              borderRadius="25px"
              border="1px solid #222"
              w={200}
              bg={"#060606"}
            >
              Fade
            </Flex>
          </FadeContent>
          <RefreshButton onClick={forceRerender} />
        </Box>

        <Customize>
          <PreviewSwitch
            title="Blur"
            isChecked={blur}
            onChange={(e) => {
              setBlur(e.target.checked);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Duration"
            min={500}
            max={3000}
            step={100}
            value={duration}
            valueUnit="ms"
            onChange={(val) => {
              setDuration(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Delay"
            min={0}
            max={2000}
            step={100}
            value={delay}
            valueUnit="ms"
            onChange={(val) => {
              setDelay(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Threshold"
            min={0.1}
            max={1}
            step={0.1}
            value={threshold}
            onChange={(val) => {
              setThreshold(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Initial Opacity"
            min={0}
            max={1}
            step={0.1}
            value={initialOpacity}
            onChange={(val) => {
              setInitialOpacity(val);
              forceRerender();
            }}
          />

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Easing:</Text>
            <Button
              fontSize="xs"
              onClick={() => {
                setEasing(easing === "ease-out" ? "ease-in-out" : "ease-out");
                forceRerender();
              }}
            >
              Easing: <Text color={"#a1a1aa"}>&nbsp;{String(easing)}</Text>
            </Button>
          </Flex>
        </Customize>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={fadeContent} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...fadeContent} />
      </CliTab>
    </TabbedLayout>
  );
};

export default FadeDemo;
