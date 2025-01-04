import { useState } from "react";
import { CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { CODE_EXAMPLES } from "../../constants/ExampleConstants";

import AnimatedContainer from '../../content/Animations/AnimatedContainer/AnimatedContainer';
import RefreshButton from "../../components/common/RefreshButton";
import CodeExample from "../../components/code/CodeExample";
import Dependencies from "../../components/code/Dependencies";
import useForceRerender from "../../hooks/useForceRerender";

const AnimatedContainerDemo = () => {
  const { animatedContainer } = CODE_EXAMPLES;
  
  const [direction, setDirection] = useState('vertical');
  const [distance, setDistance] = useState(100);
  const [reverse, setReverse] = useState(false);
  const [key, forceRerender] = useForceRerender();


  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" minH={200} overflow="hidden">
          <RefreshButton onClick={forceRerender} />
          <AnimatedContainer key={key} reverse={reverse} direction={direction} distance={distance}>
            <Flex fontSize="xl" fontWeight="bolder" justifyContent="center" alignItems="center" color="black" h={100} borderRadius="xl" w={200} bg={"#fff"}>Container</Flex>
          </AnimatedContainer>
        </Box>

        <div className="preview-options">
          <h2 className="demo-title-extra">Options</h2>
          <Flex gap={2}>
            <Button
              fontSize="xs"
              h={8}
              onClick={() => {
                setDirection(direction === 'vertical' ? 'horizontal' : 'vertical');
                forceRerender();
              }}
            >
              Direction: <Text color={"#a1a1aa"}>&nbsp;{String(direction)}</Text>
            </Button>
            <Button
              fontSize="xs"
              h={8}
              onClick={() => {
                setDistance(distance === 100 ? 50 : 100);
                forceRerender();
              }}
            >
              Distance: <Text color="#a1a1aa">&nbsp;{String(distance)}</Text>
            </Button>
            <Button
              fontSize="xs"
              h={8}
              onClick={() => {
                setReverse(!reverse);
                forceRerender();
              }}
            >
              Reverse: <Text color={reverse ? "lightgreen" : "coral"}>&nbsp;{String(reverse)}</Text>
            </Button>
          </Flex>
        </div>

        <Dependencies dependencyList={['@react-spring/web']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={animatedContainer} />
      </CodeTab>
    </TabbedLayout>
  );
}

export default AnimatedContainerDemo;