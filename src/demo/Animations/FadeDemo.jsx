import { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { CODE_EXAMPLES } from "../../constants/ExampleConstants";

import Fade from "../../content/Animations/Fade/Fade";
import RefreshButton from "../../components/common/RefreshButton";
import CodeExample from "../../components/code/CodeExample";
import useForceRerender from "../../hooks/useForceRerender";

const FadeDemo = () => {
  const { fade } = CODE_EXAMPLES;

  const [blur, setBlur] = useState(false);
  const [key, forceRerender] = useForceRerender();


  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" minH={200}>
          <Fade key={key} blur={blur}>
            <Flex fontSize="xl" fontWeight="bolder" justifyContent="center" alignItems="center" color="black" h={100} borderRadius="xl" w={200} bg={"#fff"}>Fade</Flex>
          </Fade>
          <RefreshButton onClick={forceRerender} />
        </Box>

        <div className="preview-options">
          <h2 className="demo-title-extra">Options</h2>
          <Flex gap={2}>
            <Button
              fontSize="xs"
              h={8}
              onClick={() => {
                setBlur(!blur);
                forceRerender();
              }}
            >
              Blur: <Text color={blur ? "lightgreen" : "coral"}>&nbsp;{String(blur)}</Text>
            </Button>
          </Flex>
        </div>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={fade} />
      </CodeTab>
    </TabbedLayout>
  );
}

export default FadeDemo;