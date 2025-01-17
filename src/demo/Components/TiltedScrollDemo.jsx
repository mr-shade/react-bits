import { Flex } from "@chakra-ui/react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";

import CodeExample from '../../components/code/CodeExample';
import CliInstallation from "../../components/code/CliInstallation";

import TiltedScroll from "../../content/Components/TiltedScroll/TiltedScroll";
import { tiltedScroll } from '../../constants/code/Components/tiltedScrollCode';

const TiltedScrollDemo = () => {
  return (
    <TabbedLayout>
      <PreviewTab>
        <Flex overflow="hidden" justifyContent="center" alignItems="center" minH={400} position="relative" pb={"4em"} className="demo-container">
          <TiltedScroll />
        </Flex>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={tiltedScroll} />
      </CodeTab>

      <CliTab>
        <CliInstallation cliDefault={tiltedScroll.cliDefault} cliTailwind={tiltedScroll.cliTailwind} />
      </CliTab>
    </TabbedLayout>
  );
}

export default TiltedScrollDemo;