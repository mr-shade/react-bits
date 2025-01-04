import { Flex } from "@chakra-ui/react";
import { CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { CODE_EXAMPLES } from "../../constants/ExampleConstants";

import Stack from "../../content/Components/Stack/Stack";
import CodeExample from '../../components/code/CodeExample';
import Dependencies from "../../components/code/Dependencies";

const StackDemo = () => {
  const { stack } = CODE_EXAMPLES;

  return (
    <TabbedLayout>
      <PreviewTab>
        <Flex overflow="hidden" justifyContent="center" alignItems="center" minH={400} position="relative" pb={"4em"} className="demo-container">
          <Stack />
        </Flex>

        <Dependencies dependencyList={['@react-spring/web', 'react-use-gesture']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={stack} />
      </CodeTab>
    </TabbedLayout>

  );
}

export default StackDemo;