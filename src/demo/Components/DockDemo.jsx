import { useState } from "react";
import { Box, Button, ButtonGroup, Divider, Flex, Text } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";

import CodeExample from "../../components/code/CodeExample";
import Dependencies from "../../components/code/Dependencies";
import useForceRerender from "../../hooks/useForceRerender";
import CliInstallation from "../../components/code/CliInstallation";

import Dock from "../../content/Components/Dock/Dock";
import { dock } from '../../constants/code/Components/dockCode';

const DockDemo = () => {
  const [position, setPosition] = useState('bottom');
  const [responsive, setResponsive] = useState('bottom');
  const [collapsible, setCollapsible] = useState(false);
  const [key, forceRerender] = useForceRerender();

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" minH={400}>
          <Dock key={key} position={position} collapsible={collapsible} responsive={responsive} />
        </Box>

        <Box className="preview-options">
          <h2 className="demo-title-extra">Options</h2>
          <Flex gap={2} alignItems="center" fontSize="xs" wrap="wrap">
            <Button
              fontSize="xs"
              h={8}
              onClick={() => {
                setCollapsible(!collapsible);
                forceRerender();
              }}
            >
              Collapsible: <Text color={collapsible ? "lightgreen" : "coral"}>&nbsp;{String(collapsible)}</Text>
            </Button>

            <Divider mx={2} h={6} orientation="vertical" display={{ base: 'none', md: 'inline' }} />

            <ButtonGroup isAttached size="sm">
              <Button
                fontSize="xs"
                h={8}
                bg="#a1a1aa"
                isDisabled
                _disabled={{ bg: '#222', cursor: 'not-allowed', _hover: { bg: '#222' } }}
              >
                Position
              </Button>
              <Button
                bg={position === 'top' ? '#00f0ff' : '#111'}
                _hover={{ backgroundColor: `${position === "top" ? '#00f0ff' : '#111'}` }}
                color={position === 'top' ? 'black' : 'white'}
                fontSize="xs"
                h={8}
                onClick={() => {
                  setPosition('top');
                }}
              >
                Top
              </Button>
              <Button
                bg={position === 'right' ? '#00f0ff' : '#111'}
                _hover={{ backgroundColor: `${position === "right" ? '#00f0ff' : '#111'}` }}
                color={position === 'right' ? 'black' : 'white'}
                fontSize="xs"
                h={8}
                onClick={() => {
                  setPosition('right');
                }}
              >
                Right
              </Button>
              <Button
                bg={position === 'bottom' ? '#00f0ff' : '#111'}
                _hover={{ backgroundColor: `${position === "bottom" ? '#00f0ff' : '#111'}` }}
                color={position === 'bottom' ? 'black' : 'white'}
                fontSize="xs"
                h={8}
                onClick={() => {
                  setPosition('bottom');
                }}
              >
                Bottom
              </Button>
              <Button
                bg={position === 'left' ? '#00f0ff' : '#111'}
                _hover={{ backgroundColor: `${position === "left" ? '#00f0ff' : '#111'}` }}
                color={position === 'left' ? 'black' : 'white'}
                fontSize="xs"
                h={8}
                onClick={() => {
                  setPosition('left');
                }}
              >
                Left
              </Button>
            </ButtonGroup>

            <Divider mx={2} h={6} orientation="vertical" display={{ base: 'none', md: 'inline' }} />

            <ButtonGroup isAttached size="sm">
              <Button
                fontSize="xs"
                h={8}
                bg="#a1a1aa"
                isDisabled
                _disabled={{ bg: '#222', cursor: 'not-allowed', _hover: { bg: '#222' } }}
              >
                Responsive
              </Button>
              <Button
                bg={responsive === 'top' ? '#00f0ff' : '#111'}
                _hover={{ backgroundColor: `${responsive === "top" ? '#00f0ff' : '#111'}` }}
                color={responsive === 'top' ? 'black' : 'white'}
                fontSize="xs"
                h={8}
                onClick={() => {
                  setResponsive('top');
                }}
              >
                Top
              </Button>
              <Button
                bg={responsive === 'bottom' ? '#00f0ff' : '#111'}
                _hover={{ backgroundColor: `${responsive === "bottom" ? '#00f0ff' : '#111'}` }}
                color={responsive === 'bottom' ? 'black' : 'white'}
                fontSize="xs"
                h={8}
                onClick={() => {
                  setResponsive('bottom');
                }}
              >
                Bottom
              </Button>
            </ButtonGroup>
          </Flex>
        </Box>

        <p className="demo-extra-info">
          <InfoOutlineIcon position="relative" />The `responsive` prop overrides the `position` on mobile (under 768px) devices.
        </p>

        <Dependencies dependencyList={['@react-spring/web']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={dock} />
      </CodeTab>

      <CliTab>
        <CliInstallation cliDefault={dock.cliDefault} />
      </CliTab>
    </TabbedLayout>
  );
}

export default DockDemo;