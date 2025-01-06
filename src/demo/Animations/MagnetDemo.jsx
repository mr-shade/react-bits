import { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { CODE_EXAMPLES } from "../../constants/ExampleConstants";

import Magnet from "../../content/Animations/Magnet/Magnet";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";

const MagnetDemo = () => {
  const { magnet } = CODE_EXAMPLES;

  const [disabled, setDisabled] = useState(false);

  return (
    <TabbedLayout>
      <PreviewTab>
        <h2 className="demo-title-extra">Container</h2>
        <Box position="relative" className="demo-container" minH={300}>
          <Magnet padding={100} disabled={disabled}>
            <Flex w={200} h={100} fontWeight={800} color="black" bg="#00f0ff" borderRadius="xl" justifyContent="center" alignItems="center">
              So magnetic!
            </Flex>
          </Magnet>
        </Box>

        <h2 className="demo-title-extra">Link</h2>
        <Box position="relative" className="demo-container" minH={300}>
          <Magnet padding={50} disabled={disabled}>
            <a href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noreferrer">
              <Flex>Star&nbsp;<Text color="#00f0ff">React Bits</Text>&nbsp;on GitHub!</Flex>
            </a>
          </Magnet>
        </Box>

        <div className="preview-options">
          <h2 className="demo-title-extra">Options</h2>
          <Flex gap={2}>
            <Button
              fontSize="xs"
              h={8}
              onClick={() => {
                setDisabled(!disabled);
              }}
            >
              Disabled: <Text color={disabled ? "lightgreen" : "coral"}>&nbsp;{String(disabled)}</Text>
            </Button>
          </Flex>
        </div>

        <p className="demo-extra-info">
          <InfoOutlineIcon position="relative" />You can configure the bounds of the animation using the `padding` prop.
        </p>
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={magnet} />
      </CodeTab>

      <CliTab>
        <CliInstallation cliDefault={magnet.cliDefault} />
      </CliTab>
    </TabbedLayout>

  );
}

export default MagnetDemo;