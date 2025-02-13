import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Switch, Text } from "@chakra-ui/react";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/PropTable";
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from "../../hooks/useForceRerender";

import Carousel from "../../content/Components/Carousel/Carousel";
import { carousel } from "../../constants/code/Components/carouselCode";

const CarouselDemo = () => {
  const [width, setWidth] = useState(300);
  const [autoplay, setAutoplay] = useState(false);
  const [autoplayDelay, setAutoplayDelay] = useState(3000);
  const [pauseOnHover, setPauseOnHover] = useState(false);
  const [loop, setLoop] = useState(false);
  const [round, setRound] = useState(false);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "items",
      type: "CarouselItem[]",
      default: "DEFAULT_ITEMS",
      description:
        "An array of carousel items. Each item must include title, description, id, and icon."
    },
    {
      name: "baseWidth",
      type: "number",
      default: "300",
      description:
        "Total width (in px) of the carousel container. Effective item width is baseWidth minus padding."
    },
    {
      name: "autoplay",
      type: "boolean",
      default: "false",
      description:
        "Enables automatic scrolling to the next item at a fixed interval."
    },
    {
      name: "autoplayDelay",
      type: "number",
      default: "3000",
      description:
        "Delay in milliseconds between automatic scrolls when autoplay is enabled."
    },
    {
      name: "pauseOnHover",
      type: "boolean",
      default: "false",
      description:
        "Pauses the autoplay functionality when the carousel is hovered."
    },
    {
      name: "loop",
      type: "boolean",
      default: "false",
      description:
        "When true, the carousel loops seamlessly from the last item back to the first."
    },
    {
      name: "round",
      type: "boolean",
      default: "true",
      description:
        "When true, the carousel is rendered with a 1:1 aspect ratio and circular container/items."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} overflow="hidden">
          <Carousel
            key={key}
            baseWidth={width}
            autoplay={autoplay}
            autoplayDelay={autoplayDelay}
            pauseOnHover={pauseOnHover}
            loop={loop}
            round={round}
          />
        </Box>


        <div className="preview-options">
          <h2 className="demo-title-extra">Options</h2>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Width</Text>
            <Slider min={250} max={330} step={10} value={width} onChange={(val) => { setWidth(val); forceRerender(); }} width="140px">
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm">{width}</Text>
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Round Variant</Text>
            <Switch
              isChecked={round}
              onChange={(e) => { setRound(e.target.checked); forceRerender(); }}
            />
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Loop</Text>
            <Switch
              isChecked={loop}
              onChange={(e) => { setLoop(e.target.checked); forceRerender(); }}
            />
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Autoplay</Text>
            <Switch
              isChecked={autoplay}
              onChange={(e) => { setAutoplay(e.target.checked); forceRerender(); }}
            />
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Autoplay Delay</Text>
            <Slider isDisabled={!autoplay} min={1000} max={4000} step={1000} value={autoplayDelay} onChange={(val) => { setAutoplayDelay(val); forceRerender(); }} width="140px">
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm">{autoplayDelay}</Text>
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Pause On Hover</Text>
            <Switch
              isDisabled={!autoplay}
              isChecked={pauseOnHover}
              onChange={(e) => { setPauseOnHover(e.target.checked); forceRerender(); }}
            />
          </Flex>
        </div>

        <PropTable data={propData} />
        <Dependencies dependencyList={['framer-motion']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={carousel} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...carousel} />
      </CliTab>
    </TabbedLayout>
  );
};

export default CarouselDemo;