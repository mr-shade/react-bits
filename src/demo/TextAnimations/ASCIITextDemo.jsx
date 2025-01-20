import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Switch,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/PropTable";
import Dependencies from "../../components/code/Dependencies";

import ASCIIText from "../../content/TextAnimations/ASCIIText/ASCIIText";

import { asciiText } from "../../constants/code/TextAnimations/asciiTextCode";

const propData = [
  {
    name: "text",
    type: "string",
    default: '"Hello World!"',
    description: "The text displayed on the plane in the ASCII scene."
  },
  {
    name: "enableWaves",
    type: "boolean",
    default: "true",
    description: "If false, disables the wavy text animation."
  },
  {
    name: "asciiFontSize",
    type: "number",
    default: "12",
    description: "Size of the ASCII glyphs in the overlay."
  },
  {
    name: "textFontSize",
    type: "number",
    default: "200",
    description: "Pixel size for the text that’s drawn onto the plane texture."
  },
  {
    name: "planeBaseHeight",
    type: "number",
    default: "8",
    description: "How tall the plane is in 3D. The plane width is auto-based on text aspect."
  },
  {
    name: "textColor",
    type: "string",
    default: "#fdf9f3",
    description: "The color of the text drawn onto the plane texture."
  },
  {
    name: "strokeColor",
    type: "string",
    default: "N/A",
    description: "Not used here, but you could add it if you want an outline effect."
  }
];

const ASCIITextDemo = () => {
  const [text, setText] = useState("react_bits");
  const [enableWaves, setEnableWaves] = useState(true);
  const [asciiFontSize, setAsciiFontSize] = useState(8);

  const dependencyList = [
    "three"
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          className="demo-container"
          minH={400}
          maxH={400}
          overflow="hidden"
          mb={6}
        >
          {/* The ASCII scene with live props */}
          <ASCIIText
            text={text}
            enableWaves={enableWaves}
            asciiFontSize={asciiFontSize}
          />
        </Box>

        <Box mb={6}>
          <Flex alignItems="center" gap={4} flexWrap="wrap" mb={4}>

            {/* Text */}
            <FormControl w="200px">
              <FormLabel fontSize="sm">Text</FormLabel>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text..."
              />
            </FormControl>

            {/* ASCII Font Size */}
            <FormControl w="160px">
              <FormLabel fontSize="sm">ASCII Font</FormLabel>
              <NumberInput
                value={asciiFontSize}
                min={1}
                max={64}
                step={1}
                onChange={(_, valNumber) => setAsciiFontSize(valNumber || 1)}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </Flex>

          <Flex alignItems="center" gap={4} flexWrap="wrap">
            <FormControl display="flex" alignItems="center" w="160px">
              <FormLabel mb="0" fontSize="sm">
                Waves
              </FormLabel>
              <Switch
                isChecked={enableWaves}
                onChange={(e) => setEnableWaves(e.target.checked)}
              />
            </FormControl>
          </Flex>
        </Box>

        <PropTable data={propData} />
        <Dependencies dependencyList={dependencyList} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={asciiText} />
      </CodeTab>

      <CliTab>
        <CliInstallation
          cliDefault={asciiText.cliDefault}
          cliTailwind={asciiText.cliTailwind}
        />
      </CliTab>
    </TabbedLayout>
  );
};

export default ASCIITextDemo;
