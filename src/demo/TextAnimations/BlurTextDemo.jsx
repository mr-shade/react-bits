import { Box } from "@chakra-ui/react";
import { CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { CODE_EXAMPLES } from "../../constants/ExampleConstants";

import BlurText from "../../content/TextAnimations/BlurText/BlurText";
import CodeExample from "../../components/code/CodeExample";
import RefreshButton from "../../components/common/RefreshButton";
import Dependencies from "../../components/code/Dependencies";
import useForceRerender from "../../hooks/useForceRerender";

const BlurTextDemo = () => {
  const { blurText } = CODE_EXAMPLES;

  const [key, forceRerender] = useForceRerender();

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container">
          <BlurText key={key} text="Isn't this so cool?!" className="blur-text-demo" />
          <RefreshButton onClick={forceRerender} />
        </Box>

        <Dependencies dependencyList={['@react-spring/web']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={blurText} />
      </CodeTab>
    </TabbedLayout>

  );
}

export default BlurTextDemo;