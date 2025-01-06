import { Box } from "@chakra-ui/react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { CODE_EXAMPLES } from "../../constants/ExampleConstants";

import WaveText from "../../content/TextAnimations/WaveText/WaveText";
import RefreshButton from "../../components/common/RefreshButton";
import CodeExample from '../../components/code/CodeExample';
import Dependencies from "../../components/code/Dependencies";
import useForceRerender from "../../hooks/useForceRerender";
import CliInstallation from "../../components/code/CliInstallation";

const WaveTextDemo = () => {
  const { waveText } = CODE_EXAMPLES;
  const [key, forceRerender] = useForceRerender();

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container">
          <WaveText key={key} />
          <RefreshButton onClick={forceRerender} />
        </Box>

        <Dependencies dependencyList={['@react-spring/web']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={waveText} />
      </CodeTab>

      <CliTab>
        <CliInstallation cliDefault={waveText.cliDefault} />
      </CliTab>
    </TabbedLayout>
  );
}

export default WaveTextDemo;