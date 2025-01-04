import { Box } from "@chakra-ui/react";
import { CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { CODE_EXAMPLES } from "../../constants/ExampleConstants";

import SplitText from "../../content/TextAnimations/SplitText/SplitText";
import CodeExample from '../../components/code/CodeExample';
import RefreshButton from "../../components/common/RefreshButton";
import Dependencies from "../../components/code/Dependencies";
import useForceRerender from "../../hooks/useForceRerender";

const SplitTextDemo = () => {
  const { splitText } = CODE_EXAMPLES;
  const [key, forceRerender] = useForceRerender();

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container">
          <SplitText key={key} text="Hello!" className="split-text-demo" />
          <RefreshButton onClick={forceRerender} />
        </Box>

        <Dependencies dependencyList={['@react-spring/web']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={splitText} />
      </CodeTab>
    </TabbedLayout>
  );
};

export default SplitTextDemo;
